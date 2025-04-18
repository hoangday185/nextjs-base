import envConfig from "@/config";
import { LoginResType } from "@/schemaValidations/auth.schema";
import { redirect } from "next/navigation";
import { set } from "zod";

const UNPROCCESSED_ERROR_STATUS = 422;

export class HttpError extends Error {
	statusCode: number;
	payload: any;
	constructor({ statusCode, payload }: { statusCode: number; payload: any }) {
		super(`HTTP Error: ${statusCode}`);
		this.statusCode = statusCode;
		this.payload = payload;
	}
}

export class UnprocessedError extends HttpError {
	statusCode: 422;
	payload: { errors: { field: string; message: string }[] } = { errors: [] };
	constructor({
		statusCode = UNPROCCESSED_ERROR_STATUS,
		payload,
	}: {
		statusCode?: number;
		payload: { errors: { field: string; message: string }[] };
	}) {
		super({ statusCode: UNPROCCESSED_ERROR_STATUS, payload: { errors: [] } });
		this.statusCode = 422;
		this.payload = payload || { errors: [] };
	}
}

class SessionToken {
	token = "";

	get value() {
		return this.token;
	}

	set value(token: string) {
		if (typeof window === "undefined") {
			throw new Error("Session token can only be set in the browser.");
		}
		this.token = token;
	}
}

export const clientSessionToken = new SessionToken();

type CustomOptions = Omit<RequestInit, "method"> & {
	baseUrl?: string;
};
let clientRequest: Promise<any> | null = null;
const request = async <Response>(
	method: "GET" | "POST" | "PUT" | "DELETE",
	url: string,
	options?: CustomOptions
) => {
	const body = options?.body ? JSON.stringify(options?.body) : undefined;
	const baseHeaders = {
		"Content-Type": "application/json",
		Authorization: clientSessionToken.value
			? `Bearer ${clientSessionToken.value}`
			: "",
	};
	const baseUrl =
		options?.baseUrl === undefined
			? process.env.NEXT_PUBLIC_API_ENDPOINT
			: options?.baseUrl;

	const fullUrl = url.startsWith("/")
		? `${baseUrl}${url}`
		: `${baseUrl}/${url}`;

	const res = await fetch(fullUrl, {
		...options,
		headers: {
			...baseHeaders,
			...options?.headers,
		},
		method,
		body: body,
	});

	const payload: Response = await res.json();

	const data = {
		statusCode: res.status,
		payload: payload,
	};

	if (!res.ok) {
		if (res.status === UNPROCCESSED_ERROR_STATUS) {
			throw new UnprocessedError(data as any);
		} else if (res.status === 401) {
			if (typeof window === "undefined") {
				//server side
				const sessionToken = (options as any).headers?.Authorization?.split(
					" "
				)[1];
				redirect(`/logout?sessionToken=${sessionToken}`);
			} else {
				if (!clientRequest) {
					clientRequest = fetch("/api/auth/logout", {
						method: "POST",
						body: JSON.stringify({ force: true }),
						headers: {
							"Content-Type": "application/json",
						},
					});

					await clientRequest;
					clientRequest = null;
					clientSessionToken.value = "";
					location.href = "/login";
				}
			}
		} else {
			throw new HttpError(data);
		}
	}

	if (typeof window !== "undefined") {
		if (["/auth/login", "/auth/register"].includes(url)) {
			clientSessionToken.value = (payload as LoginResType).data.token;
		} else if ("/auth/logout" === url) {
			clientSessionToken.value = "";
		}
	}

	return data;
};

const http = {
	get: <Response>(url: string, options: CustomOptions) =>
		request<Response>("GET", url, options),
	post: <Response>(
		url: string,
		body: any,
		options?: Omit<CustomOptions, "body"> | undefined
	) => request<Response>("POST", url, { ...options, body }),
	put: <Response>(
		url: string,
		body: any,
		options?: Omit<CustomOptions, "body"> | undefined
	) => request<Response>("PUT", url, { ...options, body }),
	delete: <Response>(
		url: string,
		body: any,
		options?: Omit<CustomOptions, "body"> | undefined
	) => request<Response>("DELETE", url, { ...options, body }),
};

export default http;
