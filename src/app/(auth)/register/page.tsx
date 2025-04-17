import RegisterForm from "./register-form";

const registerPage = () => {
	return (
		<div>
			<h1 className="text-center">Đăng ký</h1>
			<div className="flex justify-center w-full flex-shrink-0">
				<RegisterForm />
			</div>
		</div>
	);
};

export default registerPage;
