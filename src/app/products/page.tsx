import productApRequest from "@/apiRequest/product";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import ButtonDelete from "./_components/ButtonDelete";

const ProductList = async () => {
	const res = await productApRequest.get();
	const productList = res.payload.data;

	return (
		<div>
			<Button variant={"secondary"}>
				<Link href={"/products/add"}>Thêm sản phẩm</Link>
			</Button>
			<h1 className="text-center text-2xl">Danh sách sản phẩm</h1>

			<div className="space-y-5">
				{productList.map((product) => (
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
						<div className="flex space-x-2">
							<Link href={`products/${product.id}`}>
								<Button variant={"outline"}>Edit</Button>
							</Link>
							<ButtonDelete product={product} />
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ProductList;
