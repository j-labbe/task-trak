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

interface ContextProps {
    tasks: any[],
    refreshTasks: () => Promise<any[]>,
    addTask: any,
    userData: any,
    getUserData: any
}

const defaultProps = {
    tasks: [],
    refreshTasks: async function (): Promise<any[]> {
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
                return temp;
            }).catch((e) => new Error(e));
        } catch (e) {
            new Error(e);
            return [];
        }
        return result;
    },
    addTask: () => { },
    userData: {
        username: "",
        firstName: "",
        password: "",
        lastLogin: 0
    },
    getUserData: async function(): Promise<object> {
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
                return data;
            }).catch((e) => new Error(e));
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
     * Get the current user's data.
     * @returns Object - Contains user data
     */
    const getUserData = async (): Promise<any> => {
        
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
            refreshTasks: defaultProps.refreshTasks,
            addTask: addTask,
            userData: userData,
            getUserData: getUserData
        }} {...props} />
    )
}