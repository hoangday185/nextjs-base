"use client";

import { useEffect } from "react";
import { useAppContext } from "../AppProvider";
import envConfig from "@/config";

const Profile = () => {
	const { sessionToken } = useAppContext();

	useEffect(() => {
		const fetchRequest = async () => {
			const res = await fetch(
				`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${sessionToken}`,
					},
				}
			).then(async (res) => {
				const payload = await res.json();
				const data = {
					status: res.status,
					payload: payload.data,
				};
				if (!res.ok) {
					throw data;
				}
				return data;
			});

			return res;
		};

		fetchRequest();
	}, [sessionToken]);
	return <div></div>;
};

export default Profile;
