"use client";

import productApRequest from "@/apiRequest/product";
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
import { Textarea } from "@/components/ui/textarea";
import { handleErrorApi } from "@/lib/utils";
import {
	CreateProductBody,
	CreateProductBodyType,
} from "@/schemaValidations/product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const ProductForm = () => {
	const [image, setImage] = useState<File | null>(null);
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const form = useForm<CreateProductBodyType>({
		resolver: zodResolver(CreateProductBody),
		defaultValues: {
			name: "",
			description: "",
			price: 0,
			image: "",
		},
	});

	// const { handleSubmit } = form;
	// const onSubmit = handleSubmit(async (values: CreateProductBodyType) => {

	// 	if (loading) return;

	// 	setLoading(true);
	// 	try {
	// 		const formData = new FormData();
	// 		formData.append("file", image as Blob);
	// 		const result = await productApRequest.uploadImage(formData);
	// 		const imageUrl = result.payload.data;
	// 		console.log(imageUrl);
	// 		await productApRequest.create({
	// 			...values,
	// 			image: imageUrl,
	// 		});

	// 		// router.push("/products");
	// 	} catch (error) {
	// 		handleErrorApi({
	// 			error,
	// 			setError: form.setError,
	// 			duration: 1000,
	// 		});
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// });

	const onSubmit = async (values: CreateProductBodyType) => {
		if (loading) return;

		setLoading(true);
		try {
			const formData = new FormData();
			formData.append("file", image as Blob);
			const result = await productApRequest.uploadImage(formData);
			const imageUrl = result.payload.data;
			await productApRequest.create({
				...values,
				image: imageUrl,
			});

			// router.push("/products");
		} catch (error) {
			handleErrorApi({
				error,
				setError: form.setError,
				duration: 1000,
			});
		} finally {
			setLoading(false);
		}
	};

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
							<FormLabel>Tên</FormLabel>
							<FormControl>
								<Input placeholder="shadcn" {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>description</FormLabel>
							<FormControl>
								<Textarea placeholder="shadcn" {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="price"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Price</FormLabel>
							<FormControl>
								<Input placeholder="shadcn" type="number" {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="image"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Image</FormLabel>
							<FormControl>
								<Input
									type="file"
									accept="image/*"
									onClick={(e: any) => {
										e.target.value = null;
									}}
									onChange={(e) => {
										const file = e.target.files?.[0];
										if (file) {
											if (field.value !== file.name) {
												setImage(file);
												field.onChange("http://localhost:3000/" + file.name);
											}
										}
									}}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				{image && (
					<div className="flex items-center gap-2">
						<Image
							src={URL.createObjectURL(image)}
							width={128}
							height={128}
							alt="image"
							className="w-20 h-20 object-cover rounded-md"
						/>
						<Button
							onClick={() => {
								setImage(null);
								form.setValue("image", "");
							}}
							type="button"
							variant={"destructive"}
						>
							Xóa
						</Button>
					</div>
				)}

				<Button type="submit" className="!mt-4 w-full">
					Submit
				</Button>
			</form>
		</Form>
	);
};

export default ProductForm;
