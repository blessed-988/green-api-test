import { createWithMiddlewares } from "src/shared/utils/createWithMiddlewares";

interface State {
    idInstance: string;
    apiTokenInstance: string;
}

interface Action {
    setInstance: (credentials: State) => void;
    clearInstance: () => void;
}

const initialState: State = {
    apiTokenInstance: "",
    idInstance: "",
};

export const useInstanceStore = createWithMiddlewares<State & Action>("instance-store")((set) => ({
    ...initialState,
    setInstance: (credentials) => set((state) => ({ ...state, ...credentials })),
    clearInstance: () => set(() => ({ ...initialState })),
}));
