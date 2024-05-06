"use client";
import useProductsStore from "@/stores/products";
import Image from "next/image";
import React from "react";

export default function ProductBox({ product }: { product: Product }) {
	const { favorites, toggleFavorite } = useProductsStore();

	return (
		<div key={product.id} className="group relative flex flex-col">
			<button
				onClick={() => toggleFavorite(product.id)}
				className={`
								${!favorites.includes(product.id) ? "opacity-0 group-hover:opacity-100 " : ""}
								absolute top-[10px] right-[10px] 
								w-7 h-7
								flex justify-center items-center gap-2.5 
								[background:rgba(255,255,255,0.60)] backdrop-blur-[5px] 
								rounded-[30px] 
								transition-all
							`}
			>
				{favorites.includes(product.id) ? <Image src="/icons/heart-icon-filled.svg" alt="heart" width={20} height={20} /> : <Image src="/icons/heart-icon.svg" alt="heart" width={20} height={20} />}
			</button>
			<div className="flex items-center justify-center h-[216px] rounded-[5px] border-[0.5px] border-solid border-[#D6D6D6] overflow-hidden">
				<Image src={product.images[0]} alt={product.title} width={200} height={200} />
			</div>
			<div className="flex flex-col justify-center mt-[10px]">
				<div className="line-clamp-1 text-black font-inter text-xs font-light leading-6 tracking-[-0.24px]">{product.title}</div>
				<div className="text-black font-inter text-xs font-semibold leading-6 tracking-[-0.24px]">{product.price}₺</div>
			</div>
		</div>
	);
}
