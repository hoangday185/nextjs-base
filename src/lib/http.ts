import envConfig from "@/config";
import { LoginResType } from "@/schemaValidations/auth.schema";
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
		payload,
	}: {
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

type CustomOptions = Omit<RequestInit, "body"> & {
	baseUrl: string;
	body?: any;
};

const request = async <Response>(
	method: "GET" | "POST" | "PUT" | "DELETE",
	url: string,
	options?: CustomOptions
) => {
	const baseHeader = {
		"Content-Type": "application/json",
	};

	const baseUrl =
		options?.baseUrl === undefined
			? process.env.NEXT_PUBLIC_API_ENDPOINT
			: options.baseUrl;

	const fullUrl = url.startsWith("/")
		? `${baseUrl}${url}`
		: `${baseUrl}/${url}`;

	const res = await fetch(fullUrl, {
		...options,
		method,
		body: options?.body ? JSON.stringify(options.body) : undefined,
		headers: {
			...baseHeader,
			...options?.headers,
		},
	});

	const payload: Response = await res.json();
	if (!res.ok) {
		if (res.status === UNPROCCESSED_ERROR_STATUS) {
			throw new UnprocessedError({ payload: payload as any });
		} else {
			throw new HttpError({ statusCode: res.status, payload });
		}
	}

	if (typeof window !== "undefined") {
		if (["/auth/login", "/auth/register"].includes(url)) {
			clientSessionToken.value = (payload as LoginResType).data.token;
		} else if ("/auth/logut" === url) {
			clientSessionToken.value = "";
		}
	}

	return {
		statusCode: res.status,
		payload: payload,
	};
};

const http = {
	get: <Response>(url: string, options: CustomOptions) =>
		request<Response>("GET", url, options),
	post: <Response>(url: string, body: any, options?: CustomOptions) =>
		request<Response>("POST", url, { ...options, ...body }),
	put: <Response>(url: string, body: any, options?: CustomOptions) =>
		request<Response>("PUT", url, { ...options, ...body }),
	delete: <Response>(url: string, body: any, options?: CustomOptions) =>
		request<Response>("DELETE", url, { ...options, ...body }),
};

export default http;
