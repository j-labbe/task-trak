import * as React from 'react';
import * as API from 'utils/api';
import * as Components from './components';
import { ArrayOfTasks, ContextProps, ContextCreateTask, Task } from '../types';

const defaultProps = {
    tasks: [],
    userData: {
        username: "",
        firstName: "",
        password: "",
        lastLogin: 0
    },
    refreshTasks: async function (): Promise<ArrayOfTasks> {
        return await Components.refreshTasks();
    },
    updateTask: async function (updatedTask: Task): Promise<any> {
        return await Components.updateTask(updatedTask);
    },
    getUserData: async function (): Promise<object> {
        return await Components.getUserData();
    },
    createTask: async function (config: ContextCreateTask): Promise<object> {
        return await Components.createTask(config);
    },
    deleteTask: async function (config: {}): Promise<boolean> {
        return await Components.deleteTask(config);
    },
    updateTaskList: () => { }, // react state
    appIsLoading: false, // react state
    setAppIsLoading: () => { } // react state
}

export const AppContext = React.createContext<ContextProps | null>(defaultProps);

export default function AppContextProvider(props: React.PropsWithChildren<{}>) {

    const [tasks, setTasks] = React.useState([]);
    const [userData, setUserData] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(false);

    const refreshTasks = async (): Promise<ArrayOfTasks> => {
        // define a separate function within hook to set the context state
        let result: ArrayOfTasks;
        result = await defaultProps.refreshTasks();
        setTasks(result);
        return result;
    };

    const getUserData = async (): Promise<any> => {
        try {
            const res = await defaultProps.getUserData();
            setUserData(res);
        } catch (e) {
            return Promise.reject(e);
        }
        Promise.resolve();
    };

    const createTask = async (newTask: ContextCreateTask): Promise<void> => {
        try {
            await defaultProps.createTask(newTask);
            Promise.resolve();
        } catch (e) {
            return Promise.reject(e);
        }
    };

    const updateTask = async (updatedTask: Task): Promise<void> => {
        try {
            await defaultProps.updateTask(updatedTask);
            Promise.resolve();
        } catch (e) {
            return Promise.reject(e);
        }
    };

    const deleteTask = async () => {

    }

    return (
        <AppContext.Provider value={{
            tasks: tasks,
            refreshTasks: refreshTasks,
            userData: userData,
            getUserData: getUserData,
            createTask: createTask,
            updateTask: updateTask,
            deleteTask: () => { },
            updateTaskList: setTasks,
            appIsLoading: isLoading,
            setAppIsLoading: setIsLoading
        }} {...props} />
    )
}