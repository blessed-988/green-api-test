import { z } from "zod";

export const MESSANGER_OPTIONS = [
    { value: "telegram", label: "Telegram" },
    { value: "whatsapp", label: "WhatsApp" },
    { value: "max", label: "Max" },
    { value: "custom", label: "Свой сервер" },
] as const;

export const loginSchema = z
    .object({
        idInstance: z.string().min(1, "Поле обязательно для заполнения"),
        apiTokenInstance: z.string().min(1, "Поле обязательно для заполнения"),
        messengerType: z.string().min(1, "Выберите мессенджер"),
        customApiUrl: z.string().optional(),
    })
    .refine(
        (data) => {
            if (data.messengerType === "custom") {
                return data.customApiUrl && data.customApiUrl.trim() !== "";
            }
            return true;
        },
        {
            message: "Введите API URL",
            path: ["customApiUrl"],
        },
    );

export type LoginFormData = z.infer<typeof loginSchema>;
