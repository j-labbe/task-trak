import axios from "axios";

const API_URL = "http://localhost:3000/api/";
declare const apiEndpoints: readonly ["getAllTasks", "getTask", "getUserData", "login", "createTask", "deleteTask", "updateTask"];
declare const apiRequestMethods: readonly ["GET", "POST"];
export declare type apiRequestEndpoint = typeof apiEndpoints[number];
export declare type apiRequestMethod = typeof apiRequestMethods[number];

/**
 * Make a request to the API server.
 * @function Request
 * @param config - endpoint: API Endpoint, method: API Request Method, data: Data being passed to server.
 * @returns Object - server response.
 */
export async function Request(config: { endpoint: apiRequestEndpoint; method?: apiRequestMethod; data?: object }): Promise<object> {
    switch (config.method) {
        case "GET":
            return axios
                .get(API_URL + config.endpoint)
                .then((res) => res.data)
                .catch((err) => Promise.reject(err));
        case "POST":
            switch (config.endpoint) {
                case "createTask":
                    return axios
                        .post(API_URL + config.endpoint, JSON.stringify(config.data))
                        .then((res) => res.data)
                        .catch((err) => Promise.reject(err));
                default:
                    return axios
                        .post(API_URL + config.endpoint, JSON.stringify(config.data))
                        .then((res) => res.data)
                        .catch((err) => Promise.reject(err));
            }
        default:
            return axios
                .get(API_URL + config.endpoint)
                .then((res) => res.data)
                .catch((err) => Promise.reject(err));
    }
}
