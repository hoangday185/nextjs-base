export async function POST(request: Request) {
	const res = await request.json();
	const sessionToken = res.sessionToken;
	const expiresAt = res.expiresAt;
	if (!sessionToken) {
		return Response.json(
			{ message: "ko nhận được token" },
			{
				status: 401,
			}
		);
	}
	const expiredAt = new Date(expiresAt).toUTCString();
	return Response.json(res, {
		status: 200,
		headers: {
			"Set-Cookie": `sessionToken=${sessionToken}; Path=/;  HttpOnly; Expires=${expiredAt}; SameSite=Strict; Secure;`,
		},
	});
}
