import * as React from 'react';
import * as API from 'utils/api';

interface IndividualTaskTypes {
    id: number,
    name: string,
    description: string,
    properties: {
        startDate: string,
        endDate: string,
        timeZone: string,
        tags: Array<{ urgent: boolean, name: string }>
    },
    progress: number
};

export type TaskTypes = Array<IndividualTaskTypes>;

export interface UserDataTypes {
    username: string,
    firstName: string,
    password: string, // IMPORTANT! This will be removed. Only for demo purposes
    lastLogin: number
}

type ContextProps = {
    tasks: any[],
    refreshTasks: any,
    addTask: any,
    userData: any,
    getUserData: any
}

const defaultProps = {
    tasks: [],
    refreshTasks: () => { },
    addTask: () => { },
    userData: {
        username: "",
        firstName: "",
        password: "",
        lastLogin: 0
    },
    getUserData: () => { }
}

export const AppContext = React.createContext<ContextProps | null>(defaultProps);

export default function AppContextProvider(props: React.PropsWithChildren<{}>) {
    //const [tasks, setTasks] = React.useState([]);

    const [tasks, setTasks] = React.useState([]);
    const [userData, setUserData] = React.useState({});

    /**
     * Returns the tasks for the logged in user.
     * @function refreshTasks
     * @returns Array - List of tasks
     */
    const refreshTasks = async (): Promise<any[]> => {
        let result: any;
        try {
            result = await API.Request({
                endpoint: "getAllTasks",
                method: "GET"
            }).then((res: TaskTypes) => {
                let temp = [];
                Object.keys(res).map(i => {
                    temp[i] = res[i];
                });
                setTasks(temp);
                return tasks;
            }).catch((e) => new Error(e));
        } catch (e) {
            console.error(e);
            return [];
        }
        return result;
    };

    /**
     * Get the current user's data.
     * @returns Object - Contains user data
     */
    const getUserData = async (): Promise<any> => {
        try {
            API.Request({
                endpoint: "getUserData",
                method: "GET"
            }).then((res: JSON) => {
                let data: object;
                if (typeof res !== "object") {
                    data = JSON.parse(res);
                } else {
                    data = res;
                }
                setUserData(data);
                return userData;
            }).catch((e) => new Error(e));
        } catch (e) {
            return {};
        }
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
            console.error(e);
            return [];
        }
    };
    return (
        <AppContext.Provider value={{
            tasks: [...tasks],
            refreshTasks: refreshTasks,
            addTask: addTask,
            userData: userData,
            getUserData: getUserData
        }} {...props} />
    )
}