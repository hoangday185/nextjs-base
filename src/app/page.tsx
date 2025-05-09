import Link from "next/link";
import ButtonRedirect from "./(auth)/components/ButtonRedirect";
import { redirect } from "next/navigation";

const isAuth = false;
export default function Home() {
	if (!isAuth) {
		redirect("/login");
	}
	return (
		<main>
			<ul>
				<li>
					<Link href={"/login"}>Login</Link>
				</li>
				<li>
					<Link href={"/register"}>Register</Link>
				</li>
			</ul>
			<ButtonRedirect />
		</main>
	);
}
