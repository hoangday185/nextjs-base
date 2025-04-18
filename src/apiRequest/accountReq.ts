import http from "@/lib/http";
import { AccountResType } from "@/schemaValidations/account.schema";

const accountReq = {
	me: (sessionToken: string) =>
		http.get<AccountResType>("/account/me", {
			headers: {
				Authorization: `Bearer ${sessionToken}`,
			},
		}),
};

export default accountReq;
