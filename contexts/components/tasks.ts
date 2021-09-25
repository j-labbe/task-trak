import * as React from "react";
import * as API from "utils/api";
import * as Endpoints from "utils/endpoints";
import { ArrayOfTasks, Task, ContextCreateTask, APINewTaskReturned } from "types";

export async function refreshTasks(): Promise<ArrayOfTasks> {
    try {
        const { msg } = await API.Request({
            endpoint: Endpoints.getAllTasks,
            method: "GET",
        });
        let temp = [];
        Object.keys(msg).map((t) => {
            temp[t] = msg[t];
        });
        return temp;
    } catch (e) {
        Promise.reject(e);
    }
}

export async function updateTask(updatedTask: Task): Promise<any> {
    try {
        const { msg } = await API.Request({
            endpoint: Endpoints.updateTask,
            method: "POST",
            data: updatedTask,
        });
        return msg;
    } catch (e) {
        Promise.reject(e);
    }
}

export async function createTask(config: ContextCreateTask): Promise<Task> {
    try {
        const { msg } = await API.Request({
            endpoint: Endpoints.createTask,
            method: "POST",
            data: {
                id: config.id,
                name: config.name,
                description: config.description,
                properties: config.properties,
            },
        });
        return msg;
    } catch (e) {
        Promise.reject(e);
    }
}

export async function deleteTask(dbId: string): Promise<boolean> {
    try {
        const { msg } = await API.Request({
            endpoint: Endpoints.deleteTask,
            method: "POST",
            data: { dbId: dbId },
        });
        if (msg.toLowerCase() === "error") return false;
        return true;
    } catch (e) {
        Promise.reject(e);
    }
}
