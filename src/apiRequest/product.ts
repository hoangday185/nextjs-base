import http from "@/lib/http";
import { MessageResType } from "@/schemaValidations/common.schema";
import {
	CreateProductBodyType,
	ProductListResType,
	ProductResType,
	UpdateProductBodyType,
} from "@/schemaValidations/product.schema";

const productApRequest = {
	get: () => http.get<ProductListResType>("/products"),
	getDetail: (id: number) => http.get<ProductResType>(`/products/${id}`),
	create: (body: CreateProductBodyType) =>
		http.post<ProductResType>("/products", body),
	uploadImage: (body: FormData) =>
		http.post<{ data: string; message: string }>("/media/upload", body),
	update: (id: number, body: UpdateProductBodyType) =>
		http.put<ProductResType>(`/products/${id}`, body),
	delete: (id: number) => http.delete<MessageResType>(`/products/${id}`, {}),
};

export default productApRequest;
