import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { useLogin } from "src/features/login";
import { Card } from "src/shared/components/Card";
import { Input } from "src/shared/components/Input";
import { Button } from "src/shared/components/Button";
import { Typography } from "src/shared/components/Typography";
import { loginSchema, type LoginFormData } from "./loginSchema";
import { useNavigate } from "@tanstack/react-router";

export const LoginPage: FC = () => {
    const login = useLogin();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, isValid, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
        defaultValues: {
            idInstance: "",
            apiTokenInstance: "",
        },
    });

    const onSubmit = (data: LoginFormData) => {
        login(data);
        navigate({ to: "/chat-list" });
    };

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
                        {...register("idInstance")}
                        placeholder="Введите ID Instance"
                    />

                    <Input
                        label="API Token"
                        type="password"
                        required
                        touched={!!touchedFields.apiTokenInstance}
                        error={errors.apiTokenInstance?.message}
                        {...register("apiTokenInstance")}
                        placeholder="Введите API Token"
                    />

                    <Button className="mt-2" size="lg" type="submit" disabled={!isValid || isSubmitting}>
                        Войти
                    </Button>
                </form>
            </Card>
        </div>
    );
};
