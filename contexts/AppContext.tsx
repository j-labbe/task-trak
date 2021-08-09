import * as React from 'react';
import * as API from 'utils/api';

interface AppContextInterface {
    tasks: Array<object>,
    refreshTasks: any,
    addTask: any
}

export const AppContext = React.createContext<AppContextInterface | null>(null);

export default function AppContextProvider(props: React.PropsWithChildren<{}>) {
    const [tasks, setTasks] = React.useState([]);

    /**
     * Returns the tasks for the logged in user.
     * @function refreshTasks
     * @returns Array - List of tasks
     */
    const refreshTasks = async (): Promise<any[]> => {
        try {
            API.Request({
                endpoint: "getAllTasks",
                method: 'GET'
            }).then((res: object) => {
                Object.keys(res).map(i => setTasks(res[i]));
                console.log(tasks);
            }).catch((e) => new Error(e));
            return tasks;
        } catch (e) {
            console.error(e);
            return [];
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
    console.log(tasks);
    return (
        <AppContext.Provider value={{
            ...tasks,
            refreshTasks: refreshTasks,
            addTask: addTask
        }} {...props} />
    )
}