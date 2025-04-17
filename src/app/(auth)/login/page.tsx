"use client";

import LoginForm from "./login-form";

const LoginPage = () => {
	return (
		<div>
			<h1 className="text-center">Đăng nhập</h1>
			<div className="flex justify-center w-full flex-shrink-0">
				<LoginForm />
			</div>
		</div>
	);
};

export default LoginPage;
