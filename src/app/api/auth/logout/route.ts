import authApiRequest from "@/apiRequest/auth";
import { HttpError } from "@/lib/http";
import { cookies } from "next/headers";

export async function POST() {
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
		const res = await authApiRequest.logoutFormNextServerToServer(sessionToken);
		return Response.json(res, {
			status: 200,
			headers: {
				"Set-Cookie": `sessionToken=; Path=/;  HttpOnly;`,
			},
		});
	} catch (error) {
		//disable eslint for this line, because we need to use error in the catch block
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
