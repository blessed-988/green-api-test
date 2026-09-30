import { create } from "zustand";
import type { StateCreator } from "zustand/vanilla";
import { devtools, persist } from "zustand/middleware";

export function createWithMiddlewares<State extends object>(storeName: string) {
    return function withMiddlewares(creator: StateCreator<State>) {
        return create<State>()(
            devtools(
                persist(creator as StateCreator<unknown>, {
                    name: storeName,
                }),
                {
                    name: storeName,
                },
            ) as StateCreator<State>,
        );
    };
}
