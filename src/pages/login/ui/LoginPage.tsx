import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import type { FC } from "react";
import { useLogin } from "src/features/login";
import { checkCredentials } from "src/entities/instance";
import { Card } from "src/shared/components/Card";
import { Input } from "src/shared/components/Input";
import { Button } from "src/shared/components/Button";
import { Typography } from "src/shared/components/Typography";
import { loginSchema, type LoginFormData } from "./loginSchema";
import { useNavigate } from "@tanstack/react-router";

export const LoginPage: FC = () => {
    const login = useLogin();
    const navigate = useNavigate();
    const [isChecking, setIsChecking] = useState(false);
    const [formError, setFormError] = useState<string | undefined>(undefined);

    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, isValid },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
        defaultValues: {
            idInstance: "",
            apiTokenInstance: "",
        },
    });

    const idInstanceRegistration = register("idInstance");
    const apiTokenInstanceRegistration = register("apiTokenInstance");

    const onSubmit = useCallback(
        async (data: LoginFormData) => {
            setFormError(undefined);
            setIsChecking(true);
            try {
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
                        label="ID Instance"
                        required
                        touched={!!touchedFields.idInstance}
                        error={errors.idInstance?.message}
                        disabled={isChecking}
                        {...idInstanceRegistration}
                        onChange={(e) => {
                            idInstanceRegistration.onChange(e);
                            handleFieldChange();
                        }}
                        placeholder="Введите ID Instance"
                    />

                    <Input
                        label="API Token"
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
                        placeholder="Введите API Token"
                    />

                    {formError && <span className="text-sm text-red-500">{formError}</span>}

                    <Button className="mt-2" size="lg" type="submit" disabled={!isValid} loading={isChecking}>
                        Войти
                    </Button>
                </form>
            </Card>
        </div>
    );
};
