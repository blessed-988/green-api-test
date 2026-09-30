import { produce } from "immer";
import type { Message } from "src/entities/chat";
import { createWithMiddlewares } from "src/shared/utils/createWithMiddlewares";

interface State {
    chats: string[];
    chatMessages: Record<string, Message[]>;
    selectedChatPhone: string | null;
}

interface Action {
    addChat: (phone: string) => void;
    removeChat: (phone: string) => void;
    selectChat: (phone: string) => void;
    sendMessage: (phone: string, text: string) => void;
    receiveMessage: (phone: string, text: string) => void;
}

const initialState: State = {
    chats: [],
    chatMessages: {},
    selectedChatPhone: null,
};

export const useChatStore = createWithMiddlewares<State & Action>("chat-store")((set) => ({
    ...initialState,

    addChat: (phone) =>
        set(
            produce((state: State) => {
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

    selectChat: (phone) =>
        set(
            produce((state: State) => {
                state.selectedChatPhone = phone;
            }),
        ),

    // TODO: Реализовать отправку сообщения через API Green API
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

    // TODO: Реализовать получение сообщения через API Green API
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
}));
