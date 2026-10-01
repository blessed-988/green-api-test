import { useRef } from "react";
import { produce } from "immer";
import type { Message } from "src/entities/chat";
import { createWithMiddlewares } from "src/shared/utils/createWithMiddlewares";
import { normalizePhone } from "src/shared/utils/validatePhone";

interface ChatInstanceState {
    chats: string[];
    chatMessages: Record<string, Message[]>;
    selectedChatPhone: string | null;
    isSending: boolean;
}

interface MultiInstanceState {
    currentInstanceId: string;
    instances: Record<string, ChatInstanceState>;
}

interface MultiInstanceActions {
    setCurrentInstanceId: (instanceId: string) => void;
    setInstanceIsSending: (instanceId: string, isSending: boolean) => void;
    addChatToInstance: (instanceId: string, phone: string) => void;
    removeChatFromInstance: (instanceId: string, phone: string) => void;
    selectChatInInstance: (instanceId: string, phone: string) => void;
    selectNewChatInInstance: (instanceId: string, phone: string) => void;
    sendMessageToInstance: (instanceId: string, phone: string, text: string) => void;
    receiveMessageInInstance: (instanceId: string, phone: string, text: string) => void;
}

const initialInstanceState: ChatInstanceState = {
    chats: [],
    chatMessages: {},
    selectedChatPhone: null,
    isSending: false,
};

function ensureInstance(state: MultiInstanceState, instanceId: string): ChatInstanceState {
    if (!state.instances[instanceId]) {
        state.instances[instanceId] = { ...initialInstanceState };
    }
    return state.instances[instanceId];
}

export const useChatStoreByInstance = createWithMiddlewares<MultiInstanceState & MultiInstanceActions>(
    "chat-by-instance-store",
)((set) => ({
    currentInstanceId: "",
    instances: {},

    setCurrentInstanceId: (instanceId) =>
        set(
            produce((state: MultiInstanceState) => {
                state.currentInstanceId = instanceId;
            }),
        ),

    setInstanceIsSending: (instanceId, isSending) =>
        set(
            produce((state: MultiInstanceState) => {
                ensureInstance(state, instanceId).isSending = isSending;
            }),
        ),

    addChatToInstance: (instanceId, phone) =>
        set(
            produce((state: MultiInstanceState) => {
                const instance = ensureInstance(state, instanceId);
                const normalized = normalizePhone(phone);
                if (instance.chats.includes(normalized)) return;
                instance.chats.push(normalized);
                instance.chatMessages[normalized] = [];
            }),
        ),

    removeChatFromInstance: (instanceId, phone) =>
        set(
            produce((state: MultiInstanceState) => {
                const instance = ensureInstance(state, instanceId);
                const normalized = normalizePhone(phone);
                const idx = instance.chats.indexOf(normalized);
                if (idx !== -1) instance.chats.splice(idx, 1);
                delete instance.chatMessages[normalized];
                if (instance.selectedChatPhone === normalized) instance.selectedChatPhone = null;
            }),
        ),

    selectChatInInstance: (instanceId, phone) =>
        set(
            produce((state: MultiInstanceState) => {
                const instance = ensureInstance(state, instanceId);
                const normalized = normalizePhone(phone);
                if (instance.chats.includes(normalized)) instance.selectedChatPhone = normalized;
            }),
        ),

    selectNewChatInInstance: (instanceId, phone) =>
        set(
            produce((state: MultiInstanceState) => {
                const instance = ensureInstance(state, instanceId);
                const normalized = normalizePhone(phone);
                if (instance.chats.includes(normalized)) return;
                instance.chats.push(normalized);
                instance.chatMessages[normalized] = [];
                instance.selectedChatPhone = normalized;
            }),
        ),

    sendMessageToInstance: (instanceId, phone, text) =>
        set(
            produce((state: MultiInstanceState) => {
                const instance = ensureInstance(state, instanceId);
                const normalized = normalizePhone(phone);
                if (!instance.chatMessages[normalized]) instance.chatMessages[normalized] = [];
                instance.chatMessages[normalized].push({
                    id: crypto.randomUUID(),
                    text,
                    timestamp: new Date(),
                    isOwn: true,
                });
            }),
        ),

    receiveMessageInInstance: (instanceId, phone, text) =>
        set(
            produce((state: MultiInstanceState) => {
                const instance = ensureInstance(state, instanceId);
                const normalized = normalizePhone(phone);
                if (!instance.chats.includes(normalized)) {
                    instance.chats.push(normalized);
                }
                if (!instance.chatMessages[normalized]) instance.chatMessages[normalized] = [];
                instance.chatMessages[normalized].push({
                    id: crypto.randomUUID(),
                    text,
                    timestamp: new Date(),
                    isOwn: false,
                });
            }),
        ),
}));

interface ChatStoreState {
    chats: string[];
    chatMessages: Record<string, Message[]>;
    selectedChatPhone: string | null;
    isSending: boolean;
    addChat: (phone: string) => void;
    removeChat: (phone: string) => void;
    selectChat: (phone: string) => void;
    selectNewChat: (phone: string) => void;
    sendMessage: (phone: string, text: string) => void;
    receiveMessage: (phone: string, text: string) => void;
    setIsSending: (isSending: boolean) => void;
}

const emptyChats: string[] = [];
const emptyMessages: Record<string, Message[]> = {};

export const useChatStore: <T>(selector: (state: ChatStoreState) => T) => T = ((selector) => {
    const instanceId = useChatStoreByInstance((store) => store.currentInstanceId);

    const instance = useChatStoreByInstance((store) => store.instances[instanceId]);

    const chats = instance?.chats ?? emptyChats;
    const chatMessages = instance?.chatMessages ?? emptyMessages;
    const isSending = instance?.isSending ?? false;
    const selectedChatPhone = instance?.selectedChatPhone ?? null;

    const storeRef = useRef<ReturnType<typeof useChatStoreByInstance.getState> | null>(null);
    if (!storeRef.current) {
        storeRef.current = useChatStoreByInstance.getState();
    }

    const data = {
        chats,
        chatMessages,
        isSending,
        selectedChatPhone,
    };

    return selector({
        ...data,
        addChat: (phone: string) => storeRef.current!.addChatToInstance(instanceId, phone),
        removeChat: (phone: string) => storeRef.current!.removeChatFromInstance(instanceId, phone),
        selectChat: (phone: string) => storeRef.current!.selectChatInInstance(instanceId, phone),
        selectNewChat: (phone: string) => storeRef.current!.selectNewChatInInstance(instanceId, phone),
        sendMessage: (phone: string, text: string) => storeRef.current!.sendMessageToInstance(instanceId, phone, text),
        receiveMessage: (phone: string, text: string) => storeRef.current!.receiveMessageInInstance(instanceId, phone, text),
        setIsSending: (isSending: boolean) => storeRef.current!.setInstanceIsSending(instanceId, isSending),
    });
});
