import authRequest from "@/apiRequest/authReq";
import { HttpError } from "@/lib/http";
import { cookies } from "next/headers";

export async function POST(req: Request) {
	const res = await req.json();
	const force = res.force as boolean | undefined;
	const cookiesStore = await cookies();
	const sessionTokenFormRes = cookiesStore.get("sessionToken")?.value;
	if (force) {
		//xóa cookie ở client
		return Response.json(
			{ message: "Buộc đăng xuất thành công" },
			{
				status: 200,
				headers: {
					"Set-Cookie": `sessionToken=; Path=/;  HttpOnly;`,
				},
			}
		);
	}

	if (!sessionTokenFormRes) {
		return Response.json(
			{ message: "ko nhận được token" },
			{
				status: 401,
			}
		);
	}

	try {
		const res = await authRequest.logoutFormNextServerToBEServer(
			sessionTokenFormRes
		);
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
					status: error.statusCode,
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
