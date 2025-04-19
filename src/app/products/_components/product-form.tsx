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
	ProductResType,
	UpdateProductBodyType,
} from "@/schemaValidations/product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Product = ProductResType["data"];

const ProductForm = ({ product }: { product?: Product }) => {
	const [image, setImage] = useState<File | null>(null);
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const form = useForm<CreateProductBodyType>({
		resolver: zodResolver(CreateProductBody),
		defaultValues: {
			name: product?.name ?? "",
			description: product?.description ?? "",
			price: product?.price ?? 0,
			image: product?.image ?? "",
		},
	});

	const imageFormFile = form.watch("image");

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

	const createProduct = async (values: CreateProductBodyType) => {
		try {
			const formData = new FormData();
			formData.append("file", image as Blob);
			const result = await productApRequest.uploadImage(formData);
			const imageUrl = result.payload.data;
			await productApRequest.create({
				...values,
				image: imageUrl,
			});

			router.push("/products");
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

	const updateProduct = async (_values: UpdateProductBodyType) => {
		if (!product) return;
		let values = _values;
		setLoading(true);
		try {
			if (image) {
				const formData = new FormData();
				formData.append("file", image as Blob);
				const result = await productApRequest.uploadImage(formData);
				values = {
					...values,
					image: result.payload.data,
				};
			}

			await productApRequest.update(Number(product.id), values);

			toast.success("Cập nhật thành công");
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

	const onSubmit = async (values: CreateProductBodyType) => {
		if (loading) return;

		setLoading(true);
		if (product) {
			await updateProduct(values as UpdateProductBodyType);
		} else {
			await createProduct(values);
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

				{(image || imageFormFile) && (
					<div className="flex items-center gap-2">
						<Image
							src={image ? URL.createObjectURL(image) : imageFormFile}
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
					{product ? "Cập nhật" : "Tạo mới"}
				</Button>
			</form>
		</Form>
	);
};

export default ProductForm;
