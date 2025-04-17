import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { clientSessionToken } from "./lib/http";

const authPath = ["/login", "/register"];
const privatePath = ["/me"];
// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
	const token =
		req.cookies.get("sessionToken")?.value || clientSessionToken.value;
	if (authPath.some((path) => req.nextUrl.pathname === path) && token !== "") {
		return NextResponse.redirect(new URL("/me", req.url));
	} else if (
		privatePath.some((path) => req.nextUrl.pathname === path) &&
		token === ""
	) {
		return NextResponse.redirect(new URL("/login", req.url));
	}
	return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ["/login", "/register", "/me"],
};
