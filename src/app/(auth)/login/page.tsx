import LoginForm from "./login-form";

const LoginPage = () => {
	return (
		<div>
			<h1 className="text-center text-xl font-semibold">Đăng nhập</h1>
			<div className="flex justify-center">
				<LoginForm />
			</div>
		</div>
	);
};

export default LoginPage;
