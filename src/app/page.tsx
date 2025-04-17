import { redirect } from "next/navigation";

const isAuth = false;
export default function Home() {
	if (!isAuth) {
		redirect("/login");
	}
	return <main></main>;
}
