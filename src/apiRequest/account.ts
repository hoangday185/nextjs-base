import http from "@/lib/http";
import {
	AccountResType,
	UpdateMeBodyType,
} from "@/schemaValidations/account.schema";

const accountApiRequest = {
	me: (sessionToken: string) =>
		http.get<AccountResType>("/account/me", {
			headers: {
				Authorization: `Bearer ${sessionToken}`,
			},
		}),
	updateMe: (body: UpdateMeBodyType) =>
		http.put<AccountResType>("/account/me", body),
};

export default accountApiRequest;
