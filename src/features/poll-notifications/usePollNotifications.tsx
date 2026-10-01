import { useEffect, useRef } from "react";
import { useChatStore } from "src/entities/chat";
import { deleteNotification, receiveNotification } from "src/entities/message";
import { useInstanceStore } from "src/entities/instance";
import { isValidPhone, normalizePhone } from "src/shared/utils/validatePhone";

const POLL_INTERVAL = 5_555;

export function usePollNotifications() {
    const idInstance = useInstanceStore((s) => s.idInstance);
    const apiTokenInstance = useInstanceStore((s) => s.apiTokenInstance);
    const receiveMessage = useChatStore((s) => s.receiveMessage);

    const receiveMessageRef = useRef(receiveMessage);
    useEffect(() => {
        receiveMessageRef.current = receiveMessage;
    }, [receiveMessage]);

    const isPollingRef = useRef(false);

    useEffect(() => {
        if (!idInstance || !apiTokenInstance) return;

        const poll = async () => {
            if (isPollingRef.current) return;

            isPollingRef.current = true;

            try {
                const response = await receiveNotification({
                    idInstance,
                    apiTokenInstance,
                });

                const notification = response.data?.body;
                const receiptId = response.data?.receiptId;
                if (!notification || receiptId == null) return;

                if (notification.typeWebhook === "incomingMessageReceived") {
                    const text = notification.messageData.textMessageData?.textMessage;
                    if (text) {
                        const senderPhone = normalizePhone(String(notification.senderData.senderPhoneNumber));
                        if (isValidPhone(senderPhone)) {
                            receiveMessageRef.current(senderPhone, text);
                        }
                    }
                }

                await deleteNotification({
                    idInstance,
                    apiTokenInstance,
                    receiptId,
                });
            } finally {
                isPollingRef.current = false;
            }
        };

        const interval = setInterval(poll, POLL_INTERVAL);
        poll();

        return () => {
            clearInterval(interval);
        };
    }, [idInstance, apiTokenInstance]);
}
