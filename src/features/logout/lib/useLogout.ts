import { useInstanceStore } from "src/entities/instance";

export function useLogout() {
    const clearInstance = useInstanceStore((state) => state.clearInstance);

    return clearInstance;
}
