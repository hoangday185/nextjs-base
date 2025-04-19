import ProductForm from "../_components/product-form";

const ProductPageAdd = () => {
	return (
		<div>
			<h1 className="text-center">Tạo mới sản phẩm</h1>
			<div className="flex justify-center items-center">
				<ProductForm />
			</div>
		</div>
	);
};

export default ProductPageAdd;
