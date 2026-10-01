import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import type { FC } from "react";
import { useLogin } from "src/features/login";
import { checkCredentials } from "src/entities/instance";
import { Card } from "src/shared/components/Card";
import { Input } from "src/shared/components/Input";
import { Select } from "src/shared/components/Select";
import { Button } from "src/shared/components/Button";
import { Typography } from "src/shared/components/Typography";
import { loginSchema, MESSANGER_OPTIONS, type LoginFormData } from "./loginSchema";
import { useNavigate } from "@tanstack/react-router";
import { getBaseUrlByMessenger } from "src/shared/api/config/baseUrl";
import axios from "axios";

export const LoginPage: FC = () => {
    const login = useLogin();
    const navigate = useNavigate();
    const [isChecking, setIsChecking] = useState(false);
    const [formError, setFormError] = useState<string | undefined>(undefined);

    const {
        control,
        register,
        handleSubmit,
        setValue,
        formState: { errors, touchedFields, isValid },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
        defaultValues: {
            idInstance: "",
            apiTokenInstance: "",
            messengerType: "telegram",
            customApiUrl: "",
        },
    });

    const idInstanceRegistration = register("idInstance");
    const apiTokenInstanceRegistration = register("apiTokenInstance");
    register("messengerType");
    const customApiUrlRegistration = register("customApiUrl");

    const selectedMessenger = useWatch({ control, name: "messengerType" });

    const autoDetectMessenger = useCallback(
        (value: string) => {
            if (value.startsWith("4100")) {
                setValue("messengerType", "telegram", { shouldValidate: true });
            } else if (value.startsWith("3100")) {
                setValue("messengerType", "max", { shouldValidate: true });
            } else if (value.startsWith("7201")) {
                setValue("messengerType", "whatsapp", { shouldValidate: true });
            }
        },
        [setValue],
    );

    const onSubmit = useCallback(
        async (data: LoginFormData) => {
            setFormError(undefined);
            setIsChecking(true);
            try {
                const baseUrl = getBaseUrlByMessenger(
                    data.messengerType as "telegram" | "whatsapp" | "max" | "custom",
                    data.customApiUrl,
                );
                axios.defaults.baseURL = baseUrl;

                const isValid = await checkCredentials(data);
                if (!isValid) {
                    setFormError("Неверный ID Instance или API Token");
                    return;
                }
                login(data);
                navigate({ to: "/chat-list" });
            } finally {
                setIsChecking(false);
            }
        },
        [login, navigate],
    );

    const handleFieldChange = useCallback(() => {
        if (formError) {
            setFormError(undefined);
        }
    }, [formError]);

    return (
        <div className="flex min-h-screen w-full items-center justify-center p-5">
            <Card className="w-full max-w-[420px]">
                <div className="mb-8 text-center">
                    <Typography as="h1" variant="h1">
                        Вход
                    </Typography>
                    <Typography as="p" variant="caption">
                        Введите данные для авторизации
                    </Typography>
                </div>

                <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        label="idInstance"
                        required
                        touched={!!touchedFields.idInstance}
                        error={errors.idInstance?.message}
                        disabled={isChecking}
                        {...idInstanceRegistration}
                        onChange={(e) => {
                            idInstanceRegistration.onChange(e);
                            autoDetectMessenger(e.target.value);
                            handleFieldChange();
                        }}
                        placeholder="Введите idInstance"
                        tooltip="Уникальный идентификатор вашего инстанса. Находится в консоли green-api.com: откройте нужный инстанс и скопируйте поле idInstance в разделе настроек API"
                    />

                    <Input
                        label="apiTokenInstance"
                        type="password"
                        required
                        touched={!!touchedFields.apiTokenInstance}
                        error={errors.apiTokenInstance?.message}
                        disabled={isChecking}
                        {...apiTokenInstanceRegistration}
                        onChange={(e) => {
                            apiTokenInstanceRegistration.onChange(e);
                            handleFieldChange();
                        }}
                        placeholder="Введите apiTokenInstance"
                        tooltip="API токен для авторизации. Находится в консоли green-api.com: откройте нужный инстанс и скопируйте поле apiTokenInstance в разделе настроек API. Храните его в секрете"
                    />

                    <div className="my-2 border-t border-white/10" />

                    <Select
                        label="Мессенджер"
                        required
                        touched={!!touchedFields.messengerType}
                        error={errors.messengerType?.message}
                        disabled={isChecking}
                        value={selectedMessenger}
                        options={MESSANGER_OPTIONS}
                        tooltip="Выберите мессенджер вашего инстанса. Сервер API зависит от выбранного мессенджера. Настроить инстанс можно в консоли green-api.com"
                        onChange={(value: string) => {
                            setValue("messengerType", value);
                            handleFieldChange();
                        }}
                    />

                    {selectedMessenger === "custom" && (
                        <Input
                            label="apiUrl"
                            required
                            touched={!!touchedFields.customApiUrl}
                            error={errors.customApiUrl?.message}
                            disabled={isChecking}
                            {...customApiUrlRegistration}
                            onChange={(e) => {
                                customApiUrlRegistration.onChange(e);
                                handleFieldChange();
                            }}
                            placeholder="https://your-api-server.com"
                            tooltip="Укажите свой apiUrl для подключения к собственному серверу. Получить URL можно в настройках инстанса в консоли green-api.com"
                        />
                    )}

                    {formError && <span className="text-sm text-red-500">{formError}</span>}

                    <Button className="mt-2" size="lg" type="submit" disabled={!isValid} loading={isChecking}>
                        Войти
                    </Button>
                </form>
            </Card>
        </div>
    );
};
