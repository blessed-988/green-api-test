import { useState } from "react";
import type { FC } from "react";
import { useChatStore } from "src/entities/chat";
import { Button } from "src/shared/components/Button";
import { AddChatModal } from "src/features/add-chat";
import PlusIcon from "src/shared/ui/assets/icons/plus.svg?react";
import SendIcon from "src/shared/ui/assets/icons/send.svg?react";
import styles from "./ChatListPage.module.scss";
import { Card } from "src/shared/components/Card";
import { cn } from "src/shared/utils/cn";

export const ChatListPage: FC = () => {
    const chats = useChatStore((s) => s.chats);
    const chatMessages = useChatStore((s) => s.chatMessages);
    const selectedChatPhone = useChatStore((s) => s.selectedChatPhone);
    const selectChat = useChatStore((s) => s.selectChat);
    const sendMessage = useChatStore((s) => s.sendMessage);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [messageText, setMessageText] = useState("");

    const selectedMessages = selectedChatPhone ? chatMessages[selectedChatPhone] || [] : [];

    const handleAddChat = (phone: string) => {
        // TODO: Реализовать проверку существования чата и добавление через API
        selectChat(phone);
    };

    const handleSendMessage = () => {
        if (!messageText.trim() || !selectedChatPhone) return;

        // TODO: Реализовать отправку сообщения через API Green API
        sendMessage(selectedChatPhone, messageText.trim());
        setMessageText("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const getPhoneInitials = (phone: string) => {
        const digits = phone.replace(/\D/g, "");
        return digits.slice(-2);
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
                            <button
                                key={phone}
                                className={`${styles.chatItem} ${selectedChatPhone === phone ? styles.active : ""}`}
                                onClick={() => selectChat(phone)}
                            >
                                <div className={styles.avatarPlaceholder}>{getPhoneInitials(phone)}</div>
                                <div className={styles.chatInfo}>
                                    <div className={styles.chatPhone}>{phone}</div>
                                    <div className={styles.chatLastMessage}>
                                        {chatMessages[phone]?.at(-1)?.text || "Нет сообщений"}
                                    </div>
                                </div>
                            </button>
                        ))
                    )}
                </div>
            </div>

            <div className={styles.dialogArea}>
                {selectedChatPhone ? (
                    <>
                        <div className={styles.dialogHeader}>
                            <div className={styles.dialogPhone}>{selectedChatPhone}</div>
                        </div>

                        <div className={styles.messagesArea}>
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
                                    disabled={!messageText.trim()}
                                    className={styles.sendButton}
                                >
                                    <SendIcon />
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
        </div>
    );
};
