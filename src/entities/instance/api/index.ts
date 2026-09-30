import axios from "axios";
import type { InstanceCredentials } from "../types/InstanceCredentials";

export async function getStateInstance(credentials: InstanceCredentials) {
    return await axios.get<{
        stateInstance: "notAuthorized" | "authorized" | "blocked" | "suspended" | "starting" | "pendingPassword";
    }>(`/waInstance${credentials.idInstance}/getStateInstance/${credentials.apiTokenInstance}`);
}
