export async function POST(request: Request) {
	const res = await request.json();
	const sessionToken = res.payload?.token;
	if (!sessionToken) {
		return Response.json(
			{ message: "ko nhận được token" },
			{
				status: 401,
			}
		);
	}
	return Response.json(res.payload, {
		status: 200,
		headers: {
			"Set-Cookie": `sessionToken=${sessionToken}; Path=/;  HttpOnly;`,
		},
	});
}
