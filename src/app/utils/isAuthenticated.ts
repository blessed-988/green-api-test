import { getInstanceCredentials } from "src/entities/instance";

export function isAuthenticated() {
    const { idInstance, apiTokenInstance } = getInstanceCredentials();
    return Boolean(idInstance && apiTokenInstance);
}
