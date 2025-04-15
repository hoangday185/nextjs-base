import envConfig from "@/config";
import { cookies } from "next/headers";
import Profile from "./profile";

const ProfilePage = async () => {
	const cookieStore = await cookies();
	const sessionToken = cookieStore.get("sessionToken");
	//disable eslint for this line, because we need to use sessionToken in the fetch request
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const result = await fetch(
		`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`,
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${sessionToken?.value}`,
			},
		}
	).then(async (res) => {
		const payload = await res.json();
		const data = {
			status: res.status,
			payload,
		};
		if (!res.ok) {
			throw data;
		}
		return data;
	});

	return (
		<div>
			<h1>Profile</h1>
			<Profile />
		</div>
	);
};

export default ProfilePage;
