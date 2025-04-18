"use client";

import accountReq from "@/apiRequest/accountReq";
import { clientSessionToken } from "@/lib/http";
import { useEffect } from "react";

const Profile = () => {
	useEffect(() => {
		const fetchData = async () => {
			const req = await accountReq.me(clientSessionToken.value);
			return req;
		};
		fetchData();
	}, []);
	return <div>ngon</div>;
};

export default Profile;
