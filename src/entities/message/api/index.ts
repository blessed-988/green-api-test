import axios, { type AxiosResponse } from "axios";

export interface SendMessageParams {
    phoneNumber: string;
    message: string;
    idInstance: string;
    apiTokenInstance: string;
}

export interface SendMessageResponse {
    idMessage: string;
}

export async function sendMessage({
    apiTokenInstance,
    phoneNumber,
    idInstance,
    message,
}: SendMessageParams): Promise<AxiosResponse<SendMessageResponse>> {
    return await axios.post<SendMessageResponse>(`/waInstance${idInstance}/sendMessage/${apiTokenInstance}`, {
        message,
        chatId: `${phoneNumber}@c.us`,
    });
}

export interface IncomingNotification {
    typeWebhook: string;
    instanceData: {
        idInstance: number;
        wid: string;
        typeInstance: string;
    };
    timestamp: number;
    idMessage: string;
    senderData: {
        chatId: string;
        chatType: string;
        sender: string;
        chatName: string;
        senderName: string;
        senderType: string;
        senderContactName: string;
        senderPhoneNumber: number;
    };
    messageData: {
        typeMessage: string;
        textMessageData?: {
            textMessage: string;
            isForwarded: boolean;
            forwardingScore: number;
        };
    };
}

export interface ReceiveNotificationResponse {
    body: IncomingNotification;
    receiptId: number;
}

export async function receiveNotification({
    idInstance,
    apiTokenInstance,
}: {
    idInstance: string;
    apiTokenInstance: string;
}): Promise<AxiosResponse<ReceiveNotificationResponse | null>> {
    return await axios.get<ReceiveNotificationResponse | null>(
        `/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`,
    );
}

export interface DeleteNotificationParams {
    idInstance: string;
    apiTokenInstance: string;
    receiptId: number;
}

export async function deleteNotification({
    idInstance,
    apiTokenInstance,
    receiptId,
}: DeleteNotificationParams): Promise<void> {
    await axios.delete(`/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`);
}
