import { useState } from "react";
import type { FC } from "react";
import { Button } from "src/shared/components/Button";
import { Modal } from "src/shared/components/Modal";
import { PhoneInput } from "src/shared/components/PhoneInput";
import styles from "./AddChatModal.module.scss";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (phone: string) => void;
}

export const AddChatModal: FC<Props> = ({ isOpen, onClose, onAdd }) => {
    const [phone, setPhone] = useState("");
    const [error, setError] = useState<string>();

    const reset = () => {
        setPhone("");
        setError("");
    };

    const close = () => {
        reset();
        onClose();
    };

    const handleSubmit = () => {
        setError(undefined);

        const digits = phone.replace(/\D/g, "");

        // Validate Russian phone format: 11 digits starting with 7
        if (digits.length !== 11) {
            setError("Введите корректный номер телефона");
            return;
        }
        if (!digits.startsWith("7")) {
            setError("Номер телефона должен начинаться с 7");
            return;
        }

        // Check if chat already exists
        onAdd(phone);

        close();
    };

    return (
        <Modal isOpen={isOpen} onClose={close} title="Новый чат">
            <div className={styles.form}>
                <PhoneInput value={phone} onChange={setPhone} error={error} />
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
