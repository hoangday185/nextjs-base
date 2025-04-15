"use client";
import { createContext, useContext, useState } from "react";

const AppContext = createContext({
	sessionToken: "",
	//disable eslint
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	setSessionToken: (token: string) => {},
});

export const useAppContext = () => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error("useAppContext must be used within an AppProvider");
	}
	return context;
};

const AppProvider = ({
	children,
	initialSessionToken = "",
}: {
	children: React.ReactNode;
	initialSessionToken?: string;
}) => {
	const [sessionToken, setSessionToken] = useState(initialSessionToken);
	return (
		<AppContext.Provider value={{ sessionToken, setSessionToken }}>
			{children}
		</AppContext.Provider>
	);
};

export default AppProvider;
