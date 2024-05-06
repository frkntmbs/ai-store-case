"use client";
import getTime from "@/lib/getTime";
import useMessagesStore from "@/stores/messages";
import { MessageAdd1, MessageMinus } from "iconsax-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function AIChatBot() {
	const { mobileMenuOpen, toggleMobileMenu, messages, sendMessage } = useMessagesStore();
	const [inputCount, setInputCount] = useState(0);

	useEffect(() => {
		const messagesElement = document.querySelector(".messages") as HTMLElement;
		if (messagesElement) {
			messagesElement.scrollTop = messagesElement.scrollHeight;
		}
	}, [messages]);

	return (
		<>
			<div className={`aichat ${mobileMenuOpen ? "active" : ""}`}>
				<div className="flex items-center text-xl font-semibold leading-5 border-b border-[#D6D6D6] p-5 pb-[10px]">
					<span>AI Chatbot</span>
					<button className="lg:hidden ms-auto" onClick={toggleMobileMenu}>
						<MessageMinus size="24" color="#E14621" />
					</button>
				</div>
				<div className="flex flex-col h-[calc(100%-61px)] gap-3">
					<div className="grow w-full overflow-y-hidden">
						<div className="messages flex flex-col gap-5 overflow-y-auto overflow-x-visible h-full max-h-full py-5 px-5">
							{messages?.map((message, index) => (
								<div key={index} className={`flex flex-col gap-2 max-w-[90%] overflow-visible ${message.sender === "bot" ? "items-start me-auto" : "items-end ms-auto"}`}>
									<div className="flex flex-col justify-center bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.10)] rounded-[10px] p-2.5">
										{message.message.split("\n").map((line, index) => (
											<span key={index} className="text-black text-sm leading-[150%] font-inter font-normal">
												{line}
											</span>
										))}
										<span className="text-[#797979] text-xs font-light leading-5 ms-auto">{message.date}</span>
									</div>
								</div>
							))}
						</div>
					</div>
					<form
						className="w-full flex gap-[9px] px-5"
						onSubmit={(e) => {
							e.preventDefault();
							const input = (e.target as HTMLFormElement).elements[0] as HTMLInputElement;
							const newMessage: Message = {
								message: input.value,
								sender: "user",
								date: getTime(),
							};
							sendMessage(newMessage);
							input.value = "";
							setInputCount(0);
						}}
					>
						<div className="grow flex flex-col gap-2">
							<input
								type="text"
								placeholder="Yaz..."
								className="grow flex h-10 items-center gap-2.5 shrink-0 border p-2.5 rounded-[10px] border-solid border-[#D6D6D6] bg-transparent font-normal text-base lg:text-sm leading-normal"
								onChange={(e) => {
									if (e.target.value.length > 3000) {
										e.target.value = e.target.value.slice(0, 3000);
									}
									setInputCount(e.target.value.length);
								}}
							/>
							<span className="ms-auto text-black text-[10px] font-inter font-light leading-[normal]">{inputCount}/3000</span>
						</div>
						<button className="flex w-10 h-10 justify-end items-center gap-2.5 shrink-0 [background:#E14621] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.10)] p-2.5 rounded-[10px]">
							<Image src="/icons/send-icon.svg" alt="Send" width={20} height={20} />
						</button>
					</form>
				</div>
			</div>
			<button className={`aichat-button ${mobileMenuOpen ? "!hidden" : ""}`} onClick={toggleMobileMenu}>
				<MessageAdd1 size="32" />
			</button>
		</>
	);
}
