"use client";
import { useState } from "react";

const LoginPage = () => {
	const [email] = useState<string>("hoangday185@gmail.com");
	return (
		<div>
			Login page
			{email}
		</div>
	);
};

export default LoginPage;
