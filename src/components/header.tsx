import React from "react";
import { ModeToggle } from "./toggle-mode";
import Link from "next/link";
import BtnLogout from "./button-logout";
import { cookies } from "next/headers";
import accountApiRequest from "@/apiRequest/account";
import { handleErrorApi } from "@/lib/utils";

const Header = async () => {
	const cookieStore = await cookies();
	const sessionToken = cookieStore.get("sessionToken")?.value;
	let user = null;
	try {
		if (sessionToken) {
			const data = await accountApiRequest.me(sessionToken);
			user = data.payload.data;
			console.log(user);
		}
	} catch (error) {
		handleErrorApi({ error });
	}
	return (
		<div>
			<ul className="flex space-x-4">
				{user ? (
					<>
						<li>
							<BtnLogout />
						</li>
						<li>
							<span>Xin chào {user.name}</span>
						</li>
						<li>
							<Link href={"/products"}>Danh sách sản phẩm</Link>
						</li>
					</>
				) : (
					<>
						<li>
							<Link href={"/login"}>Đăng nhập</Link>
						</li>
						<li>
							<Link href={"/register"}>Đăng ký</Link>
						</li>
					</>
				)}
			</ul>

			<ModeToggle />
		</div>
	);
};

export default Header;
