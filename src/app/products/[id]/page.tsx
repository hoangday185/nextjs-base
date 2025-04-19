import productApRequest from "@/apiRequest/product";
import React from "react";

const ProductEdit = async ({ params }: { params: { id: string } }) => {
	let product = null;
	try {
		const { payload } = await productApRequest.getDetail(Number(params.id));
		product = payload.data;
		console.log(product);
	} catch (error) {
		console.log(error);
	}

	return <div>ngon</div>;
};

export default ProductEdit;
