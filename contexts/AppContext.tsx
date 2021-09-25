import * as React from 'react';
import * as API from 'utils/api';
import * as Components from './components';
import { ArrayOfTasks, ContextCreateTask, Task } from 'types';
import { makeObservable, observable, action, runInAction } from 'mobx';

// Handle state changes utilizing MobX

export default class ContextState {
    tasks: ArrayOfTasks = [];
    userData: any = {};
    appIsLoading: boolean = false;
    tasksRefreshing: boolean = false;
    constructor() {
        makeObservable(this, {
            tasks: observable,
            userData: observable,
            appIsLoading: observable,
            tasksRefreshing: observable,
            refreshTasks: action,
            createTask: action,
            updateTask: action,
            deleteTask: action,
            setAppLoading: action,
            setRefreshStatus: action,
            getUserData: action
        });
        this.getTasks = this.getTasks.bind(this);
        this.refreshTasks = this.refreshTasks.bind(this);
        this.createTask = this.createTask.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.setAppLoading = this.setAppLoading.bind(this);
        this.setRefreshStatus = this.setRefreshStatus.bind(this);
        this.getUserData = this.getUserData.bind(this);
    }
    getTasks() { return this.tasks; }
    async refreshTasks(): Promise<void> {
        try {
            const data = await Components.refreshTasks();
            // MobX strict mode async
            runInAction(() => this.tasks = data);
        } catch (e) {
            console.error(e);
            return Promise.reject();
        }
    }
    async createTask(config: ContextCreateTask): Promise<void> {
        try {
            const data = await Components.createTask(config);
            // MobX strict mode async
            runInAction(() => this.tasks.push(data));
        } catch (e) {
            console.error(e);
            return Promise.reject();
        }
    }
    async updateTask(updatedTask: Task): Promise<void> {
        try {
            const data = await Components.updateTask(updatedTask);
            const index = this.tasks.findIndex((t) => t.id === data.id);
            if (index === -1) return Promise.reject("Task does not exist");
            // MobX strict mode async
            runInAction(() => this.tasks[index] = data);
        } catch (e) {
            console.error(e);
            return Promise.reject();
        }
    }
    async deleteTask({ task, taskId }: { task?: Task, taskId?: string }): Promise<void> {
        try {
            if (!task && !taskId) return Promise.reject("Invalid parameter. Provide an identifier.");
            if (taskId) task = this.tasks.find((t) => t.id === taskId);
            if (!task) return Promise.reject("Task does not exist.");
            const data = await Components.deleteTask(task.dbId);
            if(data){
                runInAction(() => {
                    this.tasks = this.tasks.filter((t) => t.id !== task.id);
                });
            }else{
                console.log("Could not remove.");
            }
        } catch (e) {
            console.error(e);
            return Promise.reject();
        }
    }
    setAppLoading(param: boolean): void {
        this.appIsLoading = param;
    }
    setRefreshStatus(param: boolean): void {
        this.tasksRefreshing = param;
    }
    async getUserData(): Promise<void> {
        try {
            const data = await Components.getUserData();
            if (!data) return Promise.reject("Invalid login");
            // MobX strict mode async
            runInAction(() => this.userData = data);
        } catch (e) {
            console.error(e);
            return Promise.reject();
        }
    }
}

export const AppContext = React.createContext(null);

export const AppContextProvider = ({ children, contextState }) => {
    return (
        <AppContext.Provider value={contextState}>
            {children}
        </AppContext.Provider>
    )
}

export const useContextState = () => React.useContext(AppContext);

export const withStore = (Component) => (props) => {
    return <Component {...props} ctxt={useContextState()} />;
}
