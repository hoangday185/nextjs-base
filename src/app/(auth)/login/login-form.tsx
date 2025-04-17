import authRequest from "@/apiRequest/authReq";
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
import { clientSessionToken } from "@/lib/http";
import { handleErrorApi } from "@/lib/utils";
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

const LoginForm = () => {
	const router = useRouter();
	const form = useForm<LoginBodyType>({
		resolver: zodResolver(LoginBody),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: LoginBodyType) {
		try {
			const res = await authRequest.login(values);

			await authRequest.auth({ sessionToken: res.payload.data.token });
			console.log(clientSessionToken.value);
			router.push("/me");
		} catch (error) {
			handleErrorApi(error, form.setError);
		}
	}

	return (
		<Form {...form}>
			<form
				noValidate
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-2 w-full max-w-[600px]"
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
								<Input placeholder="shadcn" {...field} type="password" />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<Button className="mt-2 w-full" type="submit">
					Submit
				</Button>
			</form>
		</Form>
	);
};

export default LoginForm;
