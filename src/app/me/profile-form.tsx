"use client";

import accountApiRequest from "@/apiRequest/account";
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
import { handleErrorApi } from "@/lib/utils";
import {
	AccountResType,
	UpdateMeBody,
	UpdateMeBodyType,
} from "@/schemaValidations/account.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type Profile = AccountResType["data"];

const ProfileForm = ({ profile }: { profile: Profile }) => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const form = useForm<UpdateMeBodyType>({
		resolver: zodResolver(UpdateMeBody),
		defaultValues: {
			name: profile.name,
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(values: UpdateMeBodyType) {
		if (loading) return;

		await accountApiRequest.updateMe(values);

		router.refresh();
		setLoading(true);
		try {
		} catch (error) {
			handleErrorApi({
				error,
				setError: form.setError,
				duration: 1000,
			});
		} finally {
			setLoading(false);
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

				<Button type="submit" className="!mt-4 w-full">
					Submit
				</Button>
			</form>
		</Form>
	);
};

export default ProfileForm;
