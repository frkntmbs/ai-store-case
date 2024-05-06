import useProductsStore from "@/stores/products";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Fragment, useEffect } from "react";

export default function Shorting() {
	const { sortProducts } = useProductsStore();

	const path = usePathname().split("/")[1];

	return (
		<Menu as="div" className="absolute top-0 bottom-0 my-auto right-5 h-fit inline-block text-left z-50">
			<div>
				<Menu.Button className="inline-flex justify-center items-center gap-[30px] [background:#FFF] p-2.5 rounded-[10px] border-[0.5px] border-solid border-[#D6D6D6]">
					<span className="text-black font-inter text-xs font-normal leading-[18px] tracking-[0.36px]">Filtrele</span>
					<Image src="/icons/chevron-down.svg" alt="" width={20} height={20} />
				</Menu.Button>
			</div>
			<Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
				<Menu.Items className="absolute right-0 mt-2 origin-top-right flex w-40 flex-col justify-center items-start gap-2.5 bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.15)] rounded-[10px] border-[0.5px] border-solid border-[#D6D6D6] overflow-hidden">
					{path === "favorites" && (
						<Menu.Item>
							{({ active }) => (
								<button onClick={() => sortProducts("")} className="p-2.5 text-left w-full text-black font-inter text-xs font-normal leading-[18px] tracking-[0.36px] hover:bg-[#F7F7F7]">
									Son Eklenen
								</button>
							)}
						</Menu.Item>
					)}
					<Menu.Item>
						{({ active }) => (
							<button onClick={() => sortProducts("priceASC")} className="p-2.5 text-left w-full text-black font-inter text-xs font-normal leading-[18px] tracking-[0.36px] hover:bg-[#F7F7F7]">
								Artan Fiyat
							</button>
						)}
					</Menu.Item>
					<Menu.Item>
						{({ active }) => (
							<button onClick={() => sortProducts("priceDESC")} className="p-2.5 text-left w-full text-black font-inter text-xs font-normal leading-[18px] tracking-[0.36px] hover:bg-[#F7F7F7]">
								Azalan Fiyat
							</button>
						)}
					</Menu.Item>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
