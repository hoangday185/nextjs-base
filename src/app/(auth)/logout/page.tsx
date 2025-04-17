"use client";

import authApiRequest from "@/apiRequest/auth";
import { sessionToken } from "@/lib/http";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const LogoutPage = () => {
	const router = useRouter();
	const path = usePathname();
	const searchParams = useSearchParams();
	const sessionTokenFormUrl = searchParams.get("sessionToken") as string;
	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;
		if (sessionToken.value === sessionTokenFormUrl) {
			authApiRequest.logoutFormNextClientToServer(true, signal).then(() => {
				router.push(`/login?redirectFrom=${path}`);
			});
		}

		return () => {
			controller.abort();
		};
	}, [sessionTokenFormUrl, path, router]);
	return <div></div>;
};

export default LogoutPage;
