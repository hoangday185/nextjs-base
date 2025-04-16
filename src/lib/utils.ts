import { clsx, type ClassValue } from "clsx";
import { UseFormSetError } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { EntityError, HttpError } from "./http";
import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const handleErrorApi = ({
	error,
	setError,
	duration,
}: {
	error: unknown;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setError?: UseFormSetError<any>;
	duration?: number;
}) => {
	if (error instanceof EntityError && setError) {
		error.payload.errors.forEach((e) => {
			setError(e.field, {
				type: "manual",
				message: e.message,
			});
		});
	} else {
		toast((error as HttpError).payload?.message ?? "Có lỗi xảy ra", {
			duration: duration ?? 1000,
		});
	}
};

//xóa đi ký tự đầu tiên của path
export const normalizePath = (path: string) => {
	return path.startsWith("/") ? path.slice(1) : path;
};
