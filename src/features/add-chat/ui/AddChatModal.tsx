import { useState } from "react";
import type { FC } from "react";
import { Button } from "src/shared/components/Button";
import { Modal } from "src/shared/components/Modal";
import { PhoneInput } from "src/shared/components/PhoneInput";
import styles from "./AddChatModal.module.scss";
import { useChatStore } from "src/entities/chat";
import { formatPhone } from "src/shared/utils/formatPhone";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (phone: string) => void;
}

export const AddChatModal: FC<Props> = ({ isOpen, onClose, onAdd }) => {
    const chats = useChatStore((state) => state.chats);

    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [touched, setTouched] = useState(false);

    const reset = () => {
        setPhone("");
        setError("");
        setTouched(false);
    };

    const close = () => {
        reset();
        onClose();
    };

    const validate = (newValue?: string) => {
        setTouched(true);

        const digits = (newValue ?? phone).replace(/\D/g, "");

        if (digits.length !== 11) {
            setError("Введите корректный номер телефона");
            return false;
        }

        if (!digits.startsWith("7")) {
            setError("Номер телефона должен начинаться с 7");
            return false;
        }

        if (chats.includes(digits)) {
            setError(`Чат с ${formatPhone(digits)} уже существует`);
            return false;
        }

        setError("");
        return true;
    };

    const handleSubmit = () => {
        if (!validate()) {
            return;
        }

        onAdd(phone);

        close();
    };

    return (
        <Modal isOpen={isOpen} onClose={close} title="Новый чат">
            <div className={styles.form}>
                <PhoneInput
                    value={phone}
                    onChange={(value) => {
                        setError("");
                        setPhone(value);
                    }}
                    error={touched ? error : void 0}
                    onBlur={() => validate()}
                />
                <div className={styles.actions}>
                    <Button variant="secondary" onClick={close}>
                        Отмена
                    </Button>
                    <Button onClick={handleSubmit}>Добавить</Button>
                </div>
            </div>
        </Modal>
    );
};
