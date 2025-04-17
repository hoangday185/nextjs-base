export async function POST(req: Request) {
	const data = await req.json();
	if (!data.sessionToken) {
		return Response.json(
			{ message: "sessionToken is required" },
			{ status: 401 }
		);
	}

	return Response.json(
		{ message: "success" },
		{
			status: 200,
			headers: {
				"Set-Cookie": `sessionToken=${data.sessionToken}; Path=/; HttpOnly; SameSite=Strict;`,
			},
		}
	);
}
