import ButtonLogout from "@/app/(auth)/components/ButtonLogout";
import { ModeToggle } from "@/app/mode-toggle";
import Link from "next/link";
import React from "react";

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
			<ButtonLogout />
			<ModeToggle />
		</div>
	);
};

export default Header;
