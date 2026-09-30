import { type FC } from "react";
import { Modal } from "src/shared/components/Modal";
import { Button } from "src/shared/components/Button";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
}

export const ConfirmModal: FC<Props> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Удалить",
    cancelText = "Отмена",
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <p style={{ marginBottom: 24, fontSize: 14, color: "rgb(255 255 255 / 70%)" }}>{message}</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                <Button variant="secondary" onClick={onClose}>
                    {cancelText}
                </Button>
                <Button variant="primary" onClick={() => {
                    onConfirm();
                    onClose();
                }}>
                    {confirmText}
                </Button>
            </div>
        </Modal>
    );
};
