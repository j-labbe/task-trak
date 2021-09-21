import * as React from 'react';
import * as API from 'utils/api';
import { APINewTaskReturned, ArrayOfTasks, ContextProps, UserDataTypes, ContextCreateTask, Task } from '../types';

const defaultProps = {
    tasks: [],
    refreshTasks: async function (): Promise<ArrayOfTasks> {
        const data = await API.Request({
            endpoint: "getAllTasks",
            method: "GET"
        }).then((res) => {
            let temp = [];
            //@ts-ignore
            res = res.msg;
            Object.keys(res).map(i => {
                temp[i] = res[i];
            });
            return temp;
        }).catch((e) => {
            console.error(e);
            return [];
        });
        return data;
    },
    addTask: () => { },
    updateTask: async function (updatedTask: Task): Promise<any> {
        try {
            await API.Request({
                endpoint: "updateTask",
                method: "POST",
                data: updatedTask
            }).then((res) => {
                //@ts-ignore
                return res.msg;
            }).catch((e) => {
                console.error(e);
                return;
            });
        } catch (e) {
            console.error(e);
            return;
        }
    },
    userData: {
        username: "",
        firstName: "",
        password: "",
        lastLogin: 0
    },
    getUserData: async function (): Promise<object> {
        let result: any;
        try {
            result = await API.Request({
                endpoint: "getUserData",
                method: "GET"
            }).then((res: UserDataTypes | JSON) => {
                let data: UserDataTypes;
                if (typeof res !== "object") {
                    data = JSON.parse(res);
                } else {
                    // @ts-ignore
                    data = res;
                }
                return data.msg;
            }).catch((e) => new Error(e));
        } catch (e) {
            new Error(e);
            return {};
        }
        return result;
    },
    createTask: async function (config: ContextCreateTask): Promise<object> {
        let result: any;
        try {
            result = await API.Request({
                endpoint: "createTask",
                method: "POST",
                data: {
                    id: config.id,
                    name: config.name,
                    description: config.description,
                    properties: config.properties
                }
            }).then((res: APINewTaskReturned) => {
                return res.msg;
            }).catch((e) => new Error(e));
            return result;
        } catch (e) {
            new Error(e);
            return {};
        }
    },
    deleteTask: async function (config: {}): Promise<boolean> {
        return true;
    },
    updateTaskList: () => { },
    appIsLoading: false,
    setAppIsLoading: () => { }
}

export const AppContext = React.createContext<ContextProps | null>(defaultProps);

export default function AppContextProvider(props: React.PropsWithChildren<{}>) {

    const [tasks, setTasks] = React.useState([]);
    const [userData, setUserData] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(false);

    /**
     * @returns Array - Contains all of the user's tasks
     */
    const refreshTasks = async (): Promise<ArrayOfTasks> => {
        // define a separate function within hook to set the context state
        let result: ArrayOfTasks;
        result = await defaultProps.refreshTasks();
        setTasks(result);
        return result;
    };

    /**
     * Get the current user's data.
     * @returns Object - Contains user data
     */
    const getUserData = async (): Promise<any> => {
        try {
            const res = await defaultProps.getUserData();
            setUserData(res);
        } catch (e) {
            return Promise.reject(e);
        }
        Promise.resolve();
    };

    /**
     * Adds a new task for the logged in user
     * @function addTask
     * @param newTask Object - New tasks's properties object
     * @returns Array - All tasks
     */
    const addTask = async (newTask: ContextCreateTask): Promise<void> => {
        try {
            await defaultProps.createTask(newTask);
            await refreshTasks();
        } catch (e) {
            return Promise.reject(e);
        }
        Promise.resolve();
    };

    /**
     *
     * 
     */
    const updateTask = async (updatedTask: Task): Promise<void> => {
        try {
            await defaultProps.updateTask(updatedTask);
            await refreshTasks();
        } catch (e) {
            return Promise.reject(e);
        }
        Promise.resolve();
    };

    /**
     * 
     * 
     */
    const deleteTask = async () => {

    }

    return (
        <AppContext.Provider value={{
            tasks: tasks,
            refreshTasks: refreshTasks,
            addTask: addTask,
            userData: userData,
            getUserData: getUserData,
            updateTask: updateTask,
            deleteTask: () => { },
            updateTaskList: setTasks,
            appIsLoading: isLoading,
            setAppIsLoading: setIsLoading
        }} {...props} />
    )
}