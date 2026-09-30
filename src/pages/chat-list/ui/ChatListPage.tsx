import { useEffect, useRef, useState } from "react";
import type { FC } from "react";
import { useChatStore } from "src/entities/chat";
import { sendMessage } from "src/entities/message";
import { useInstanceStore } from "src/entities/instance";
import { Button } from "src/shared/components/Button";
import { Loader } from "src/shared/components/Loader";
import { ConfirmModal } from "src/shared/components/ConfirmModal";
import { AddChatModal } from "src/features/add-chat";
import { usePollNotifications } from "src/features/poll-notifications";
import PlusIcon from "src/shared/ui/assets/icons/plus.svg?react";
import SendIcon from "src/shared/ui/assets/icons/send.svg?react";
import TrashIcon from "src/shared/ui/assets/icons/trash.svg?react";
import styles from "./ChatListPage.module.scss";
import { Card } from "src/shared/components/Card";
import { cn } from "src/shared/utils/cn";
import { formatPhone } from "src/shared/utils/formatPhone";

export const ChatListPage: FC = () => {
    usePollNotifications();

    const chats = useChatStore((s) => s.chats);
    const chatMessages = useChatStore((s) => s.chatMessages);
    const selectedChatPhone = useChatStore((s) => s.selectedChatPhone);
    const isSending = useChatStore((s) => s.isSending);
    const selectChat = useChatStore((s) => s.selectChat);
    const selectNewChat = useChatStore((s) => s.selectNewChat);
    const removeChat = useChatStore((s) => s.removeChat);
    const sendMessageToStore = useChatStore((s) => s.sendMessage);
    const setIsSending = useChatStore((s) => s.setIsSending);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [messageText, setMessageText] = useState("");
    const [chatToDelete, setChatToDelete] = useState<string | null>(null);

    const messagesAreaRef = useRef<HTMLDivElement>(null);

    const selectedMessages = selectedChatPhone ? chatMessages[selectedChatPhone] || [] : [];

    useEffect(() => {
        if (messagesAreaRef.current) {
            messagesAreaRef.current.scrollTop = messagesAreaRef.current.scrollHeight;
        }
    }, [selectedChatPhone, selectedMessages.length]);

    const handleAddChat = (phone: string) => {
        selectNewChat(phone);
    };

    const handleDeleteChat = (phone: string) => {
        setChatToDelete(phone);
    };

    const confirmDeleteChat = () => {
        if (chatToDelete) {
            removeChat(chatToDelete);
            setChatToDelete(null);
        }
    };

    const handleSendMessage = async () => {
        if (!messageText.trim() || !selectedChatPhone) return;

        const text = messageText.trim();
        setMessageText("");
        setIsSending(true);

        const credentials = useInstanceStore.getState();

        if (!credentials.idInstance || !credentials.apiTokenInstance) {
            setIsSending(false);
            return;
        }

        try {
            await sendMessage({
                idInstance: credentials.idInstance,
                apiTokenInstance: credentials.apiTokenInstance,
                phoneNumber: selectedChatPhone,
                message: text,
            });

            sendMessageToStore(selectedChatPhone, text);
        } catch {
            setMessageText(text);
        } finally {
            setIsSending(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <h2 className={styles.sidebarTitle}>Чаты</h2>
                    <Button
                        variant="secondary"
                        onClick={() => setIsAddModalOpen(true)}
                        className={styles.addChatButton}
                    >
                        <PlusIcon />
                    </Button>
                </div>

                <div className={styles.chatList}>
                    {chats.length === 0 ? (
                        <div className={styles.emptyChatList}>
                            <Card>
                                <div className={styles.emptyTitle}>Нет активных чатов</div>
                                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>
                                    Нажмите + чтобы начать диалог
                                </div>
                            </Card>
                        </div>
                    ) : (
                        chats.map((phone) => (
                            <div
                                key={phone}
                                className={`${styles.chatItem} ${selectedChatPhone === phone ? styles.active : ""}`}
                            >
                                <button
                                    className={styles.chatItemButton}
                                    onClick={() => selectChat(phone)}
                                >
                                    <div className={styles.chatInfo}>
                                        <div className={styles.chatPhone}>{formatPhone(phone)}</div>
                                        <div className={styles.chatLastMessage}>
                                            {chatMessages[phone]?.at(-1)?.text || "Нет сообщений"}
                                        </div>
                                    </div>
                                </button>
                                <button
                                    className={styles.deleteChatButton}
                                    onClick={() => handleDeleteChat(phone)}
                                >
                                    <TrashIcon />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className={styles.dialogArea}>
                {selectedChatPhone ? (
                    <>
                        <div className={styles.dialogHeader}>
                            <div className={styles.dialogPhone}>{formatPhone(selectedChatPhone)}</div>
                        </div>

                        <div className={styles.messagesArea} ref={messagesAreaRef}>
                            {selectedMessages.length === 0 ? (
                                <div className={styles.emptyMessages}>
                                    <Card className={cn("text-[13px] text-[rgb(255_255_255/50%)]")}>
                                        Начните диалог
                                    </Card>
                                </div>
                            ) : (
                                <div className={styles.messageList}>
                                    {selectedMessages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className={`${styles.messageBubble} ${
                                                msg.isOwn ? styles.own : styles.other
                                            }`}
                                        >
                                            {msg.text}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className={styles.messageInputArea}>
                            <div className={styles.messageInputWrapper}>
                                <textarea
                                    value={messageText}
                                    onChange={(e) => setMessageText(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Введите сообщение..."
                                    className={styles.messageTextarea}
                                    rows={1}
                                />
                                <Button
                                    onClick={handleSendMessage}
                                    disabled={!messageText.trim() || isSending}
                                    className={styles.sendButton}
                                >
                                    {isSending ? <Loader /> : <SendIcon />}
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className={styles.emptyState}>
                        <Card className={styles.emptyStateContent}>
                            <div className={styles.emptyTitle}>Выберите чат</div>
                            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>
                                Выберите диалог из списка или создайте новый
                            </div>
                        </Card>
                    </div>
                )}
            </div>

            <AddChatModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddChat} />

            <ConfirmModal
                isOpen={chatToDelete !== null}
                onClose={() => setChatToDelete(null)}
                onConfirm={confirmDeleteChat}
                title="Удалить чат"
                message={`Удалить чат с ${chatToDelete ? formatPhone(chatToDelete) : ""}?`}
                confirmText="Удалить"
                cancelText="Отмена"
            />
        </div>
    );
};
