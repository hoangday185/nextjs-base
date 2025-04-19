"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import authApiRequest from "@/apiRequest/auth";
import { handleErrorApi } from "@/lib/utils";

const BtnLogout = () => {
	const router = useRouter();
	const handleLogout = async () => {
		try {
			await authApiRequest.logoutFormNextClientToServer();
			router.push("/login");
		} catch (error) {
			handleErrorApi({ error });
			authApiRequest.logoutFormNextClientToServer(true).then(() => {
				router.push("/login");
			});
		} finally {
			router.refresh();
		}
	};
	return (
		<Button size="sm" onClick={handleLogout}>
			Đăng xuất
		</Button>
	);
};

export default BtnLogout;
