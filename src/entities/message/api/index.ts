import axios, { type AxiosResponse } from "axios";

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
}): Promise<AxiosResponse<{ idMessage: string }>> {
    return await axios.post<{ idMessage: string }>(`/waInstance${idInstance}/sendMessage/${apiTokenInstance}`, {
        message,
        chatId: `${phoneNumber}@c.us`,
    });
}
