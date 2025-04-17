import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { HttpError, UnprocessedError } from "./http";
import { toast } from "sonner";
import { FieldPath, FieldValues, UseFormSetError } from "react-hook-form";
import { unknown } from "zod";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const handleErrorApi = (
	errors: unknown,
	setError?: UseFormSetError<any>
) => {
	if (errors instanceof UnprocessedError && setError) {
		errors.payload.errors.forEach((err) => {
			setError(err.field, {
				type: "manual",
				message: err.message,
			});
		});
	} else if (errors instanceof HttpError) {
		toast("Lỗi", {
			description: "Lỗi không xác định",
		});
	}
};
