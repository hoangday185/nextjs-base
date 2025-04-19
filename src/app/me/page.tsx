import { cookies } from "next/headers";

import accountApiRequest from "@/apiRequest/account";
import ProfileForm from "./profile-form";

const ProfilePage = async () => {
	const cookieStore = await cookies();
	const sessionToken = cookieStore.get("sessionToken")?.value;
	const result = await accountApiRequest.me(sessionToken as string);

	return (
		<div>
			<h1>Profile</h1>
			<ProfileForm profile={result.payload.data} />
		</div>
	);
};

export default ProfilePage;
