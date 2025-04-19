import authApiRequest from "@/apiRequest/auth";
import { HttpError } from "@/lib/http";
import { cookies } from "next/headers";
export async function POST(request: Request) {
	const cookiesStore = await cookies();
	const sessionToken = cookiesStore.get("sessionToken")?.value;

	if (!sessionToken) {
		return Response.json(
			{ message: "ko nhận được token" },
			{
				status: 401,
			}
		);
	}

	try {
		const res = await authApiRequest.slideSessionFormNextServerToServer(
			sessionToken
		);
		const expiredAt = new Date(res.payload.data.expiresAt).toUTCString();
		console.log(res.payload.data.expiresAt);
		return Response.json(res.payload, {
			status: 200,
			headers: {
				"Set-Cookie": `sessionToken=${sessionToken}; Path=/;  HttpOnly; Expires=${expiredAt}; SameSite=Strict; Secure;`,
			},
		});
	} catch (error) {
		if (error instanceof HttpError) {
			return Response.json(
				{
					message: error.payload.message,
				},
				{
					status: error.status,
				}
			);
		} else {
			return Response.json(
				{ message: "Lỗi ko xác định" },
				{
					status: 500,
				}
			);
		}
	}
}
