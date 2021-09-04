import * as React from 'react';
import * as API from 'utils/api';
import { APINewTaskReturned, ArrayOfTasks, ContextProps, UserDataTypes, ContextCreateTask } from '../types';

const defaultProps = {
    tasks: [],
    refreshTasks: async function (): Promise<ArrayOfTasks> {
        const data = await API.Request({
            endpoint: "getAllTasks",
            method: "GET"
        }).then((res) => {
            let temp = [];
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
    updateTask: async function (): Promise<any> {
        let result: any;
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
                method: "POST"
            }).then((res: APINewTaskReturned) => {
                return res.msg;
            }).catch((e) => new Error(e));
            return result;
        } catch (e) {
            new Error(e);
            return {};
        }
    }
}

export const AppContext = React.createContext<ContextProps | null>(defaultProps);

export default function AppContextProvider(props: React.PropsWithChildren<{}>) {

    const [tasks, setTasks] = React.useState([]);
    const [userData, setUserData] = React.useState({});
    /**
     * @returns Array - Contains all of the user's tasks
     */
    const refreshTasks = async (): Promise<ArrayOfTasks> => {
        // define a separate function within hook to set the context state
        let result: any;
        result = await defaultProps.refreshTasks();
        setTasks(result);
        return result;
    };
    /**
     * Get the current user's data.
     * @returns Object - Contains user data
     */
    const getUserData = async (): Promise<any> => {
        return defaultProps.getUserData().then((res) => {
            setUserData(res);
            return userData;
        }).catch((e) => new Error(e));
    };
    /**
     * Adds a new task for the logged in user
     * @function addTask
     * @param newTask Object - New tasks's properties object
     * @returns Array - All tasks
     */
    const addTask = async (newTask: ContextCreateTask): Promise<any[]> => {
        let result: any;
        result = await defaultProps.createTask(newTask);
        console.log(result);
        return []; 
    };

    /**
     * 
     * 
     */
    const updateTask = async () => {

    }

    return (
        <AppContext.Provider value={{
            tasks: tasks,
            refreshTasks: refreshTasks,
            addTask: addTask,
            userData: userData,
            getUserData: getUserData,
            updateTask: () => { },
        }} {...props} />
    )
}