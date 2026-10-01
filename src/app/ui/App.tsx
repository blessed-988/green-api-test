import { RouterProvider } from "@tanstack/react-router";
import { useEffect, type FC } from "react";
import { router } from "../router";
import { useInstanceStore } from "src/entities/instance";
import { useChatStoreByInstance } from "src/entities/chat";

export const App: FC = () => {
    return (
        <>
            <RouterProvider router={router} />
            <SyncChatInstanceId />
        </>
    );
};

export default App;

function SyncChatInstanceId() {
    const idInstance = useInstanceStore((s) => s.idInstance);
    useEffect(() => {
        useChatStoreByInstance.getState().setCurrentInstanceId(idInstance);
    }, [idInstance]);
    return null;
}
