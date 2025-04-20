import productApRequest from "@/apiRequest/product";
import React from "react";
import ProductForm from "../_components/product-form";
import { ProductResType } from "@/schemaValidations/product.schema";
import Image from "next/image";

const ProductDetail = async ({
	params,
}: {
	params: Promise<{ id: string }>;
}) => {
	let product = null;
	const { id } = await params;
	const res = await productApRequest.getDetail(Number(id));
	product = res.payload.data;

	return (
		<div>
			{!product && <div>Ko tìm thấy product</div>}
			{product && (
				<div className="space-y-5">
					<div key={product.id} className="flex space-x-4 items-start">
						<Image
							src={product.image}
							width={200}
							height={200}
							alt={product.name}
							className="h-32 w-32 object-cover"
						/>

						<h3>{product.name}</h3>
						<div>{product.price}</div>
						<div>{product.description}</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductDetail;
