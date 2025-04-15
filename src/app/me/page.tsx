import { cookies } from "next/headers";
import Profile from "./profile";
import accountApiRequest from "@/apiRequest/account";

const ProfilePage = async () => {
	const cookieStore = await cookies();
	const sessionToken = cookieStore.get("sessionToken");
	//disable eslint for this line, because we need to use sessionToken in the fetch request
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const result = await accountApiRequest.me(sessionToken?.value as string);

	return (
		<div>
			<h1>Profile</h1>
			<Profile />
		</div>
	);
};

export default ProfilePage;
