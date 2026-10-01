import { produce } from "immer";
import type { Message } from "src/entities/chat";
import { createWithMiddlewares } from "src/shared/utils/createWithMiddlewares";
import { normalizePhone } from "src/shared/utils/validatePhone";

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
                const normalized = normalizePhone(phone);
                if (state.chats.includes(normalized)) return;
                state.chats.push(normalized);
                state.chatMessages[normalized] = [];
            }),
        ),

    removeChat: (phone) =>
        set(
            produce((state: State) => {
                const normalized = normalizePhone(phone);
                const idx = state.chats.indexOf(normalized);
                if (idx !== -1) state.chats.splice(idx, 1);
                delete state.chatMessages[normalized];
                if (state.selectedChatPhone === normalized) state.selectedChatPhone = null;
            }),
        ),

    selectNewChat: (phone) =>
        set(
            produce((state: State) => {
                const normalized = normalizePhone(phone);
                if (state.chats.includes(normalized)) return;
                state.chats.push(normalized);
                state.chatMessages[normalized] = [];
                state.selectedChatPhone = normalized;
            }),
        ),

    selectChat: (phone) =>
        set(
            produce((state: State) => {
                const normalized = normalizePhone(phone);
                if (state.chats.includes(normalized)) state.selectedChatPhone = normalized;
            }),
        ),

    sendMessage: (phone, text) =>
        set(
            produce((state: State) => {
                const normalized = normalizePhone(phone);
                if (!state.chatMessages[normalized]) state.chatMessages[normalized] = [];
                state.chatMessages[normalized].push({
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
                const normalized = normalizePhone(phone);
                if (!state.chats.includes(normalized)) {
                    state.chats.push(normalized);
                }
                if (!state.chatMessages[normalized]) state.chatMessages[normalized] = [];
                state.chatMessages[normalized].push({
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
