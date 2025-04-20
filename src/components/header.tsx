import React from "react";
import { ModeToggle } from "./toggle-mode";
import Link from "next/link";
import BtnLogout from "./button-logout";
import { AccountResType } from "@/schemaValidations/account.schema";

const Header = async ({ user }: { user: AccountResType["data"] }) => {
	return (
		<div>
			<ul className="flex space-x-4">
				{user ? (
					<>
						<li>
							<Link href={"/products"}>Danh sách sản phẩm</Link>
						</li>
						<li>
							<BtnLogout />
						</li>
						<li>
							<span>Xin chào {user.name}</span>
						</li>
					</>
				) : (
					<>
						<li>
							<Link href={"/products"}>Danh sách sản phẩm</Link>
						</li>
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
