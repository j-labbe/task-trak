import * as React from 'react';
import * as API from 'utils/api';
import {ArrayOfTasks, ContextProps, UserDataTypes } from '../types';

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
    updateTask: async function(): Promise<any> {
        let result: any;
    },
    userData: {
        username: "",
        firstName: "",
        password: "",
        lastLogin: 0
    },
    getUserData: async function(): Promise<object> {
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
        console.log(result);
        return result;
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
    const addTask = async (newTask: object): Promise<any[]> => {
        try {
            API.Request({
                endpoint: "createTask",
                method: 'POST',
                data: newTask
            }).then((res: object) => {
                Object.keys(res).map(i => setTasks(res[i]));
            }).catch((e) => new Error(e));
            return tasks;
        } catch (e) {
            new Error(e);
            return [];
        }
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
            updateTask: () => {}
        }} {...props} />
    )
}