import { getStateInstance } from "../api";
import type { InstanceCredentials } from "../types/InstanceCredentials";

export async function checkCredentials(credentials: InstanceCredentials): Promise<boolean> {
    try {
        const response = await getStateInstance(credentials);
        return response.data.stateInstance === "authorized";
    } catch {
        return false;
    }
}
