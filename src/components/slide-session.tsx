"use client";

import authApiRequest from "@/apiRequest/auth";
import { sessionToken } from "@/lib/http";
import { useEffect } from "react";
import { differenceInHours } from "date-fns";

const SlideSession = () => {
	useEffect(() => {
		const interval = setInterval(async () => {
			const now = new Date();
			const expiredAt = new Date(sessionToken.expiredAt);
			if (differenceInHours(expiredAt, now) < 1) {
				const res = await authApiRequest.slideSessionFormNextClientToServer();
				sessionToken.expiredAt = res.payload.data.expiresAt;
			}
		}, 1000 * 60 * 60);
		return () => clearInterval(interval);
	}, []);

	return null;
};

export default SlideSession;
