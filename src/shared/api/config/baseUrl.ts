export const baseUrl = "https://4100.api.green-api.com";

export type MessengerType = "telegram" | "whatsapp" | "max" | "custom";

const messengerBaseUrlMap: Record<MessengerType, string> = {
    telegram: "https://4100.api.green-api.com",
    whatsapp: "https://7201.api.green-api.com",
    max: "https://3100.api.green-api.com",
    custom: "",
};

export function getBaseUrlByMessenger(messengerType: MessengerType, customUrl?: string): string {
    if (messengerType === "custom" && customUrl) {
        return customUrl;
    }
    return messengerBaseUrlMap[messengerType] || baseUrl;
}
