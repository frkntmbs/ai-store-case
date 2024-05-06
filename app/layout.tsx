"use client";
import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import AIChatBot from "@/components/AIChatBot";
import Nav from "@/components/Nav";
import { useEffect } from "react";
import useProductsStore from "@/stores/products";
import useMessagesStore from "@/stores/messages";

const poppins = Poppins({
	subsets: ["latin"],
	variable: "--font-poppins",
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { setFavorites } = useProductsStore();
	const { setMessages } = useMessagesStore();

	useEffect(() => {
		const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
		const messages = JSON.parse(localStorage.getItem("messages") || "[]");
		if (favorites.length !== 0) {
			setFavorites(favorites);
		}

		if (messages.length !== 0) {
			setMessages(messages);
		}
	}, []);

	return (
		<html lang="tr">
			<body className={poppins.variable + " " + inter.variable}>
				<div className="flex">
					<AIChatBot />
					<div className="h-screen overflow-y-auto grow">
						<Nav />
						{children}
					</div>
				</div>
			</body>
		</html>
	);
}
