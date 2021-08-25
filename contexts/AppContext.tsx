import * as React from 'react';
import * as API from 'utils/api';

type ContextProps = {
    tasks: any[],
    refreshTasks: any,
    addTask: any
}

const defaultProps = {
    tasks: [],
    refreshTasks: () => {},
    addTask: () => {}
}

export const AppContext = React.createContext<ContextProps | null>(defaultProps);

export default function AppContextProvider(props: React.PropsWithChildren<{}>) {
    //const [tasks, setTasks] = React.useState([]);

    const [tasks, setTasks] = React.useState([]);

    /**
     * Returns the tasks for the logged in user.
     * @function refreshTasks
     * @returns Array - List of tasks
     */
    const refreshTasks = async (): Promise<any[]> => {
        let rValue: object[];
        try {
            API.Request({
                endpoint: "getAllTasks",
                method: "GET"
            }).then((res) => {
                let temp = [];
                Object.keys(res).map(i => {
                    temp[i] = res[i];
                });
                setTasks(temp);
            }).catch((e) => new Error(e));
        } catch (e) {
            console.error(e);
            return [];
        }
        return tasks;
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
            addTask: addTask
        }} {...props} />
    )
}