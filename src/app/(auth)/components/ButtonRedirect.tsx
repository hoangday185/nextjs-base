"use client";
import { useRouter } from "next/navigation";
import React from "react";

const ButtonRedirect = () => {
	const router = useRouter();
	const handleClick = () => {
		router.push("/login");
	};
	return <button onClick={handleClick}>Chuyển sang trong login</button>;
};

export default ButtonRedirect;
