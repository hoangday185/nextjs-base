import accountReq from "@/apiRequest/accountReq";
import { clientSessionToken } from "@/lib/http";
import { cookies } from "next/headers";
import React from "react";
import Profile from "./Profile";

const MePage = async () => {
	// const cookiesStore = await cookies();
	// const sessionTokenFormRes = cookiesStore.get("sessionToken")?.value;
	// const result = await accountReq.me(sessionTokenFormRes as string);
	return (
		<div>
			{/* Xin chào{result.payload.data.name} */}
			<div>
				<Profile />
			</div>
		</div>
	);
};

export default MePage;
