import { LoginResType } from "@/schemaValidations/auth.schema";
import { normalizePath } from "./utils";

type CustomOptions = Omit<RequestInit, "method"> & {
	baseUrl?: string;
};

export class HttpError extends Error {
	status: number;
	payload: {
		message: string;
		[key: string]: unknown;
	};
	constructor({
		status,
		payload,
	}: {
		status: number;
		payload: {
			message: string;
			[key: string]: unknown;
		};
	}) {
		super("HttpError");
		this.status = status;
		this.payload = payload;
	}
}

const ENTITY_ERROR_STATUS = 422;

type EntityErrorPayload = {
	message: string;
	errors: {
		field: string;
		message: string;
	}[];
};

export class EntityError extends HttpError {
	status: 422;
	payload: EntityErrorPayload;
	constructor(status: number, payload: EntityErrorPayload) {
		super({
			status: ENTITY_ERROR_STATUS,
			payload,
		});
		this.status = status as 422;
		this.payload = payload;
	}
}

class SessionToken {
	private token = "";
	get value() {
		return this.token;
	}

	set value(token: string) {
		if (typeof window === "undefined") {
			throw new Error("SessionToken can only be set in the browser");
		}
		this.token = token;
	}
}

export const sessionToken = new SessionToken();

const request = async <Response>(
	method: "GET" | "POST" | "PUT" | "DELETE",
	url: string,
	options?: CustomOptions
) => {
	const body = options?.body ? JSON.stringify(options.body) : undefined;
	const baseHeaders = {
		"Content-Type": "application/json",
		Authorization: sessionToken.value ? `Bearer ${sessionToken.value}` : "",
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
		headers: {
			...baseHeaders,
			...options?.headers,
		},
		method,
		body,
	});

	const payload: Response = await res.json();

	const data = {
		status: res.status,
		payload,
	};

	if (!res.ok) {
		if (res.status === ENTITY_ERROR_STATUS) {
			throw new EntityError(res.status, payload as EntityErrorPayload);
		}
		console.log(res);
		throw new HttpError({
			status: res.status,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			payload: payload as any,
		});
	}

	//đảm bảo sessionToken chỉ được set ở client, vì ở server không có window
	if (typeof window !== "undefined") {
		if (
			["auth/login", "auth/register"].some(
				(item) => item === normalizePath(url)
			)
		) {
			sessionToken.value = (payload as LoginResType).data.token;
		} else if ("auth/logout" === normalizePath(url)) {
			sessionToken.value = "";
		}
	}

	return data;
};

const http = {
	get: <Response>(
		url: string,
		options?: Omit<CustomOptions, "body"> | undefined
	) => request<Response>("GET", url, options),
	//disable eslint for this line, because we need to use body in the post method
	//type any for body, because we don't know the type of body
	post: <Response>(
		url: string,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		body: any,
		options?: Omit<CustomOptions, "body"> | undefined
	) => request<Response>("POST", url, { ...options, body }),
	put: <Response>(
		url: string,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		body: any,
		options?: Omit<CustomOptions, "body"> | undefined
	) => request<Response>("PUT", url, { ...options, body }),
	delete: <Response>(
		url: string,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		body: any,
		options?: Omit<CustomOptions, "body"> | undefined
	) => request<Response>("DELETE", url, { ...options, body }),
};

export default http;
