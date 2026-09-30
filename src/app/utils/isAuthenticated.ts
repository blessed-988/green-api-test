import { useInstanceStore } from "src/entities/instance";

export function isAuthenticated() {
    const idInstance = useInstanceStore.getState().idInstance;
    const apiTokenInstance = useInstanceStore.getState().apiTokenInstance;
    return Boolean(idInstance && apiTokenInstance);
}
