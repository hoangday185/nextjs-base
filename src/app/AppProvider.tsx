"use client";
import { sessionToken } from "@/lib/http";
import { AccountResType } from "@/schemaValidations/account.schema";
import { useContext, useState } from "react";
import { createContext } from "react";

export const AppContext = createContext<{
	user: AccountResType["data"] | null;
	setUser: (user: AccountResType["data"] | null) => void;
}>({
	user: null,
	setUser: () => {},
});

export const useAppContext = () => {
	const context = useContext(AppContext);
	return context;
};

const AppProvider = ({
	children,
	initialSessionToken = "",
	user: userProps = null,
}: {
	children: React.ReactNode;
	initialSessionToken?: string;
	user?: AccountResType["data"] | null;
}) => {
	const [user, setUser] = useState<AccountResType["data"] | null>(userProps);
	useState(() => {
		if (typeof window !== "undefined") sessionToken.value = initialSessionToken;
	});
	return (
		<AppContext.Provider
			value={{
				user,
				setUser,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppProvider;
