import http from "@/lib/http";
import {
	LoginBodyType,
	LoginResType,
	RegisterBodyType,
	RegisterResType,
	SlideSessionResType,
} from "@/schemaValidations/auth.schema";
import { MessageResType } from "@/schemaValidations/common.schema";

const authApiRequest = {
	login: (body: LoginBodyType) => http.post<LoginResType>("/auth/login", body),

	register: (body: RegisterBodyType) =>
		http.post<RegisterResType>("/auth/register", body),

	auth: (body: { sessionToken: string; expiresAt: string }) =>
		http.post("/api/auth", body, {
			baseUrl: "",
		}),
	logoutFormNextServerToServer: (sessionToken: string) =>
		http.post<MessageResType>(
			"/auth/logout",
			{},
			{
				headers: {
					Authorization: `Bearer ${sessionToken}`,
				},
			}
		),
	logoutFormNextClientToServer: (force?: true, signal?: AbortSignal) =>
		http.post<MessageResType>(
			"/api/auth/logout",
			{
				force,
			},
			{ baseUrl: "", signal }
		),
	slideSessionFormNextServerToServer: (sessionToken: string) =>
		http.post<SlideSessionResType>(
			"auth/slide-session",
			{},
			{
				headers: {
					Authorization: `Bearer ${sessionToken}`,
				},
			}
		),
	slideSessionFormNextClientToServer: (signal?: AbortSignal) =>
		http.post<SlideSessionResType>(
			"/api/auth/slide-session",
			{},
			{ baseUrl: "", signal }
		),
};

export default authApiRequest;
