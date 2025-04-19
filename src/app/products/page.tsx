import productApRequest from "@/apiRequest/product";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const ProductList = async () => {
	const res = await productApRequest.get();
	const productList = res.payload.data;

	return (
		<div>
			<h1 className="text-center text-2xl">Danh sách sản phẩm</h1>
			<div className="space-y-5">
				{productList.map((product) => (
					<div key={product.id} className="flex space-x-4">
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
						<div className="flex space-x-2">
							<Button variant={"outline"}>Edit</Button>
							<Button variant={"destructive"}>Delete</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ProductList;
