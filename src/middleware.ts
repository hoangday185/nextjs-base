import { NextRequest, NextResponse } from "next/server";

const authPath = ["/login", "/register"];
const privatePath = ["/me"];

const middleware = (req: NextRequest) => {
	const { pathname } = req.nextUrl;
	const sessionToken = req.cookies.get("sessionToken")?.value;
	//check private path
	if (privatePath.some((path) => pathname.startsWith(path)) && !sessionToken) {
		//redirect to login page
		return NextResponse.redirect(new URL("/login", req.url));
	}

	if (authPath.some((path) => pathname.startsWith(path)) && sessionToken) {
		return NextResponse.redirect(new URL("/me", req.url));
	}
	return NextResponse.next();
};

export const config = {
	matcher: ["/login", "/register", "/me"],
};
export default middleware;
