import productApRequest from "@/apiRequest/product";
import React from "react";

import { ProductResType } from "@/schemaValidations/product.schema";
import ProductForm from "../../_components/product-form";

const ProductEdit = async ({ params }: { params: Promise<{ id: string }> }) => {
	let product = null;
	const { id } = await params;
	try {
		const { payload } = await productApRequest.getDetail(Number(id));
		//default là no cache
		product = payload.data;
	} catch (error) {
		console.log(error);
	}

	return (
		<div>
			{!product && <div>Ko tìm thấy product</div>}
			<ProductForm product={product as ProductResType["data"]} />
		</div>
	);
};

export default ProductEdit;
