import { LoginResType } from "@/schemaValidations/auth.schema";

type CustomOptions = RequestInit & {
	baseUrl?: string;
};

class HttpError<T> extends Error {
	status: number;
	payload: T;
	constructor({ status, payload }: { status: number; payload: T }) {
		super("HttpError");
		this.status = status;
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
		throw new HttpError(data);
	}

	if (["/auth/login", "/auth/register"].includes(url)) {
		sessionToken.value = (payload as LoginResType).data.token;
	} else if ("/auth/logout" === url) {
		sessionToken.value = "";
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
