import axios, { type AxiosResponse } from "axios";

interface SendMessageResponse {
    idMessage: string;
}

export async function sendMessage({
    apiTokenInstance,
    phoneNumber,
    idInstance,
    message,
}: {
    phoneNumber: string;
    message: string;
    idInstance: string;
    apiTokenInstance: string;
}): Promise<AxiosResponse<SendMessageResponse>> {
    return await axios.post<SendMessageResponse>(`/waInstance${idInstance}/sendMessage/${apiTokenInstance}`, {
        message,
        chatId: `${phoneNumber}@c.us`,
    });
}
