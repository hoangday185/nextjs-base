"use client";

import { useEffect } from "react";
import accountApiRequest from "@/apiRequest/account";
import { sessionToken } from "@/lib/http";

const Profile = () => {
	useEffect(() => {
		const fetchRequest = async () => {
			const res = await accountApiRequest.me(sessionToken.value);
			return res;
		};

		fetchRequest();
	}, []);
	return <div></div>;
};

export default Profile;
