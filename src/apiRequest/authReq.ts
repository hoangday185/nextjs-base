import http from "@/lib/http";
import {
	LoginBodyType,
	LoginResType,
	RegisterBodyType,
	RegisterResType,
} from "@/schemaValidations/auth.schema";

const authRequest = {
	login: (body: LoginBodyType) =>
		http.post<LoginResType>("/auth/login", {
			body,
		}),
	register: (body: RegisterBodyType) =>
		http.post<RegisterResType>("/auth/register", { body }),
	auth: ({ sessionToken }: { sessionToken: string }) =>
		http.post("/api/auth", {
			body: { sessionToken },
			baseUrl: "",
		}),
};

export default authRequest;
