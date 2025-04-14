import Image from "next/image";

export default function Home() {
	return (
		<main className="w-[700px] h-[700px] bg-red-300">
			<Image
				// src={"/images.png"}
				src={
					"https://bs-uploads.toptal.io/blackfish-uploads/components/open_graph_image/8960950/og_image/optimized/1015_Next.js_vs._React-_A_Comparative_Tutorial_Illustration_Brief_Social-d04df761f8138010d9d98703e77ce0e9.png"
				}
				width={200}
				height={200}
				alt="suffer"
				quality={100}
			/>
		</main>
	);
}
