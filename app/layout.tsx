import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import AIChatBot from "@/components/AIChatBot";
import Nav from "@/components/Nav";

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

export const metadata: Metadata = {
	title: "FreyaAI - Test Case",
	description: "FreyaAI - Test Case",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
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
