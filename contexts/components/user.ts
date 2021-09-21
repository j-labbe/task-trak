import * as API from "utils/api";
import { UserDataTypes } from "../../types";

export async function getUserData(): Promise<UserDataTypes> {
    try {
        const { msg } = await API.Request({
            endpoint: "getUserData",
            method: "GET",
        });
        return msg;
    } catch (e) {
        Promise.reject(e);
    }
}
