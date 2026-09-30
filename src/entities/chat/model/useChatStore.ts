import { produce } from "immer";
import type { Message } from "src/entities/chat";
import { createWithMiddlewares } from "src/shared/utils/createWithMiddlewares";

interface State {
    chats: string[];
    chatMessages: Record<string, Message[]>;
    selectedChatPhone: string | null;
    isSending: boolean;
}

interface Action {
    addChat: (phone: string) => void;
    removeChat: (phone: string) => void;
    selectChat: (phone: string) => void;
    selectNewChat: (phone: string) => void;
    sendMessage: (phone: string, text: string) => void;
    receiveMessage: (phone: string, text: string) => void;
    setIsSending: (isSending: boolean) => void;
}

const initialState: State = {
    chats: [],
    chatMessages: {},
    selectedChatPhone: null,
    isSending: false,
};

export const useChatStore = createWithMiddlewares<State & Action>("chat-store")((set) => ({
    ...initialState,

    addChat: (phone) =>
        set(
            produce((state: State) => {
                if (state.chats.includes(phone)) return;
                state.chats.push(phone);
                state.chatMessages[phone] = [];
            }),
        ),

    removeChat: (phone) =>
        set(
            produce((state: State) => {
                const idx = state.chats.indexOf(phone);
                if (idx !== -1) state.chats.splice(idx, 1);
                delete state.chatMessages[phone];
                if (state.selectedChatPhone === phone) state.selectedChatPhone = null;
            }),
        ),

    selectNewChat: (phone) =>
        set(
            produce((state: State) => {
                if (state.chats.includes(phone)) return;
                state.chats.push(phone);
                state.chatMessages[phone] = [];
                state.selectedChatPhone = phone;
            }),
        ),

    selectChat: (phone) =>
        set(
            produce((state: State) => {
                if (state.chats.includes(phone)) state.selectedChatPhone = phone;
            }),
        ),

    sendMessage: (phone, text) =>
        set(
            produce((state: State) => {
                if (!state.chatMessages[phone]) state.chatMessages[phone] = [];
                state.chatMessages[phone].push({
                    id: crypto.randomUUID(),
                    text,
                    timestamp: new Date(),
                    isOwn: true,
                });
            }),
        ),

    receiveMessage: (phone, text) =>
        set(
            produce((state: State) => {
                if (!state.chatMessages[phone]) state.chatMessages[phone] = [];
                state.chatMessages[phone].push({
                    id: crypto.randomUUID(),
                    text,
                    timestamp: new Date(),
                    isOwn: false,
                });
            }),
        ),

    setIsSending: (isSending) =>
        set(
            produce((state: State) => {
                state.isSending = isSending;
            }),
        ),
}));
