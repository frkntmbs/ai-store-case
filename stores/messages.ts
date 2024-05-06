import getTime from '@/lib/getTime';
import create from 'zustand';

interface MessagesStore {
    mobileMenuOpen: boolean;
    messages: Message[];
    setMessages: (messages: Message[]) => void;
    sendMessage: (message: Message) => void;
    toggleMobileMenu: () => void;
};

const botMessages = [
    {
        message: "Merhaba 👋 \n Bugün sana nasıl yardımcı olabilirim?",
    },
    {
        message: 'Üzgünüm 😓 \n Sana şuanda yardımcı olamıyorum',
    },
];

const botMessage = (messageId: number) => {
    const newMessage: Message = {
        sender: 'bot',
        message: botMessages[messageId].message,
        date: getTime(),
    };

    return newMessage;
}


const useMessagesStore = create<MessagesStore>((set) => ({
    mobileMenuOpen: false,
    messages: [botMessage(0)],
    setMessages: (messages) => set({ messages }),
    sendMessage: (message) => {
        set((state) => {
            const updatedMessages = [...state.messages, message];
            localStorage.setItem('messages', JSON.stringify(updatedMessages));
            return { ...state, messages: updatedMessages };
        });

        // Bot response
        setTimeout(() => {
            set((state) => {
                const updatedMessages = [...state.messages, botMessage(1)];
                localStorage.setItem('messages', JSON.stringify(updatedMessages));
                return { ...state, messages: updatedMessages };
            });
        }, 1000);

    },
    toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
}));

export default useMessagesStore;