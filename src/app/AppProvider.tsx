"use client";
import { clientSessionToken } from "@/lib/http";
import { createContext, useState } from "react";

interface AppContextType {
	initSessionToken?: string;
}

const AppContext = createContext<AppContextType>({
	initSessionToken: "",
});

const AppProvider = ({
	children,
	initSessionToken = "",
}: {
	children: React.ReactNode;
	initSessionToken?: string;
}) => {
	//đây là method để khởi tạo sessionToken từ props truyền vào mỗi khi server trả về html mà trong đó có cookie
	useState(() => {
		if (typeof window !== "undefined")
			clientSessionToken.value = initSessionToken;
	});
	return (
		<AppContext.Provider value={{ initSessionToken }}>
			{children}
		</AppContext.Provider>
	);
};

export { AppContext, AppProvider };
