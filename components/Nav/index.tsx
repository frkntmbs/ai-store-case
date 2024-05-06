"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Shorting from "../Shorting";

export default function Nav() {
	let pathName = usePathname().split("/").pop();

	return (
		<div className="relative flex ms-5 lg:ms-0 lg:justify-center gap-3 pt-[26px] pb-[18px]">
			<Link className={`nav-button ${pathName === "" ? "active" : ""}`} href="/">
				Öneriler
			</Link>
			<Link className={`nav-button ${pathName === "favorites" ? "active" : ""}`} href="/favorites">
				Favoriler
			</Link>
			<Shorting />
		</div>
	);
}
