import { decodeJWT } from "@/lib/utils";

type payloadJWT = {
	iat: number;
	exp: number;
	userId: string;
};
export async function POST(request: Request) {
	const res = await request.json();
	const sessionToken = res.sessionToken;
	if (!sessionToken) {
		return Response.json(
			{ message: "ko nhận được token" },
			{
				status: 401,
			}
		);
	}
	const payload = decodeJWT<payloadJWT>(sessionToken);
	const expiredAt = new Date(payload.exp * 1000).toUTCString();
	return Response.json(res, {
		status: 200,
		headers: {
			"Set-Cookie": `sessionToken=${sessionToken}; Path=/;  HttpOnly; expires=${expiredAt}; SameSite=Strict; Secure;`,
		},
	});
}
