"use client";
import authRequest from "@/apiRequest/authReq";
import { clientSessionToken } from "@/lib/http";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const logout = () => {
	const path = usePathname();
	const router = useRouter();
	const params = useSearchParams();
	const sessionToken = params.get("sessionToken");
	useEffect(() => {
		if (sessionToken === clientSessionToken.value) {
			authRequest.logoutFormNextClientToNextServer(true).then(() => {
				router.push(`/login?redirectForm=${path}`);
			});
		}
	}, []);
	return <div>logout</div>;
};

export default logout;
