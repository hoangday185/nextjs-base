"use client";
import { Button } from "@/components/ui/button";
import { ProductResType } from "@/schemaValidations/product.schema";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import productApRequest from "@/apiRequest/product";
import { handleErrorApi } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ButtonDelete = ({ product }: { product: ProductResType["data"] }) => {
	const router = useRouter();
	const deleteProduct = async () => {
		try {
			const result = await productApRequest.delete(product.id);
			toast(result.payload.message);
			router.refresh();
		} catch (error) {
			handleErrorApi({ error });
		}
	};
	return (
		<>
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button variant={"destructive"}>Delete</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Bạn có muốn xóa sản phẩm không</AlertDialogTitle>
						<AlertDialogDescription>
							Sản phẩm là &quot;{product.name}&quot; sẽ bị xóa vĩnh viễn và
							không thể khôi phục lại.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction onClick={deleteProduct}>
							Accept
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
};

export default ButtonDelete;
