import { MessageResType } from "./../schemaValidations/common.schema";
import http from "@/lib/http";
import {
	LoginBodyType,
	LoginResType,
	RegisterBodyType,
	RegisterResType,
} from "@/schemaValidations/auth.schema";

const authRequest = {
	login: (body: LoginBodyType) => http.post<LoginResType>("/auth/login", body),
	register: (body: RegisterBodyType) =>
		http.post<RegisterResType>("/auth/register", body),
	auth: (body: { sessionToken: string }) =>
		http.post("/api/auth", body, {
			baseUrl: "",
		}),
	logoutFormNextClientToNextServer: (force?: boolean) =>
		http.post<MessageResType>(
			"/api/auth/logout",
			{
				force,
			},
			{
				baseUrl: "",
			}
		),
	logoutFormNextServerToBEServer: (sessionToken: string) =>
		http.post<MessageResType>(
			"/auth/logout",
			{},
			{
				headers: {
					Authorization: `Bearer ${sessionToken}`,
				},
			}
		),
};

export default authRequest;
