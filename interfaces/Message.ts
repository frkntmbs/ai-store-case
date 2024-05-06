//Message interface
interface Message {
    message: string;
    sender: "bot" | "user";
    date: string;
}