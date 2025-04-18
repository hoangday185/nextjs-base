"use client";
import authRequest from "@/apiRequest/authReq";
import { Button } from "@/components/ui/button";
import { clientSessionToken } from "@/lib/http";
import { useRouter } from "next/navigation";
import React from "react";

const ButtonLogout = () => {
	const router = useRouter();
	const handleLogout = async () => {
		await authRequest.logoutFormNextClientToNextServer();
		router.push("/login");
	};
	return <Button onClick={handleLogout}>Đăng xuất</Button>;
};

export default ButtonLogout;
