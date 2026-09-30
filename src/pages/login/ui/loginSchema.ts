import { z } from "zod";

export const loginSchema = z.object({
    idInstance: z.string().min(1, "Поле обязательно для заполнения"),
    apiTokenInstance: z.string().min(1, "Поле обязательно для заполнения"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
