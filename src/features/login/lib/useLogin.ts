import { useInstanceStore } from "src/entities/instance";

export function useLogin() {
    const setInstance = useInstanceStore((store) => store.setInstance);

    return setInstance;
}
