"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema";
import envConfig from "@/config";
import { useAppContext } from "@/app/AppProvider";

const LoginForm = () => {
	const { setSessionToken } = useAppContext();
	const form = useForm<LoginBodyType>({
		resolver: zodResolver(LoginBody),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(values: LoginBodyType) {
		//bên client ko thể lấy ra process.env chỉ được object rỗng :), còn server thì thoải mái
		//muốn lấy được NEXT_PUBLIC_API_ENDPOINT process.env.NEXT_PUBLIC_API_ENDPOINT
		try {
			const res = await fetch(
				`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/login`,
				{
					body: JSON.stringify(values),
					headers: {
						"Content-Type": "application/json",
					},
					method: "POST",
				}
			).then(async (res) => {
				const payload = await res.json();
				const data = {
					status: res.status,
					payload: payload.data,
				};
				if (!res.ok) {
					throw data;
				}
				return data;
			});

			const result = await fetch("/api/auth", {
				method: "POST",
				body: JSON.stringify(res),
				headers: {
					"Content-Type": "application/json",
				},
			}).then(async (res) => {
				const payload = await res.json();
				const data = {
					status: res.status,
					payload,
				};
				if (!res.ok) {
					throw data;
				}
				return data;
			});

			setSessionToken(result.payload.token);
		} catch (error) {
			//disable eslint inline here
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const err = (error as any).payload.errors as {
				field: string;
				message: string;
			}[];
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const status = (error as any).status as number;
			if (status === 422) {
				err.forEach((e) => {
					form.setError(e.field as keyof LoginBodyType, {
						type: "manual",
						message: e.message,
					});
				});
			} else {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				toast("lỗi", (error as any).payload.message);
			}
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

				<Button type="submit" className="!mt-4 w-full">
					Submit
				</Button>
			</form>
		</Form>
	);
};

export default LoginForm;
