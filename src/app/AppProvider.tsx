"use client";
import { sessionToken } from "@/lib/http";
import { useState } from "react";

const AppProvider = ({
	children,
	initialSessionToken = "",
}: {
	children: React.ReactNode;
	initialSessionToken?: string;
}) => {
	useState(() => {
		if (typeof window !== "undefined") sessionToken.value = initialSessionToken;
	});
	return <>{children}</>;
};

export default AppProvider;
