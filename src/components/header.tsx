import React from "react";
import { ModeToggle } from "./toggle-mode";
import Link from "next/link";
import BtnLogout from "./button-logout";

const Header = () => {
	return (
		<div>
			<ul>
				<li>
					<Link href={"/login"}>Đăng nhập</Link>
				</li>
				<li>
					<Link href={"/register"}>Đăng ký</Link>
				</li>
			</ul>
			<BtnLogout />
			<ModeToggle />
		</div>
	);
};

export default Header;
