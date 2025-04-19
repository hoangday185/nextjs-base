"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	RegisterBody,
	RegisterBodyType,
} from "@/schemaValidations/auth.schema";

import authApiRequest from "@/apiRequest/auth";
import { useRouter } from "next/navigation";
import { handleErrorApi } from "@/lib/utils";

const RegisterForm = () => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const form = useForm<RegisterBodyType>({
		resolver: zodResolver(RegisterBody),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(values: RegisterBodyType) {
		if (loading) return;
		setLoading(true);
		//bên client ko thể lấy ra process.env chỉ được object rỗng :), còn server thì thoải mái
		//muốn lấy được NEXT_PUBLIC_API_ENDPOINT process.env.NEXT_PUBLIC_API_ENDPOINT
		try {
			const res = await authApiRequest.register(values);

			await authApiRequest.auth({
				sessionToken: res.payload.data.token,
				expiresAt: res.payload.data.expiresAt,
			});

			router.push("/me");
		} catch (error) {
			handleErrorApi({
				error,
				setError: form.setError,
				duration: 1000,
			});
		} finally {
			setLoading(false);
			router.refresh();
		}
	}

	return (
		<Form {...form}>
			<form
				noValidate
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-2 max-w-[600px] flex-shrink-0 w-full"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="shadcn" {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="shadcn" {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input placeholder="shadcn" type="password" {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm password</FormLabel>
							<FormControl>
								<Input placeholder="shadcn" type="password" {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="!mt-4 w-full">
					Submit
				</Button>
			</form>
		</Form>
	);
};

export default RegisterForm;
