/**
 * Single Tag
 */
export interface Tag {
    urgent: string;
    name: string;
    id: number;
}
/**
 * Tags within an array.
 */
export type Tags = Array<Tag>;
/**
 * Each Task record has this data structure
 */
export interface Task {
    id: string;
    dbId?: string | number; // airtable-specific
    userId?: string | number;
    name: string;
    description: string;
    properties: {
        startDate?: string;
        endDate?: string;
        timeZone?: string;
        tags?: Tags;
    };
    progress: number;
}

/**
 * When tasks are being processed, they are entered into an array.
 */
export type ArrayOfTasks = Array<Task>;

/**
 * User Data returned from getUserData api route
 */
export interface UserDataTypes {
    msg: {
        firstName: string;
        email: string;
        locale: string;
        loginMethod: string;
    };
}

/**
 * Session data is stored with Auth0, however sometimes we need to access the data
 * quickly in a React Context.
 *
 * Both first and last are optional, as we can call useUser() at any time
 * @deprecated
 */
export interface UserProfile {
    name: {
        first?: string;
        last?: string;
    };
}

/**
 * Props used in AppContext
 */
export interface ContextProps {
    tasks: ArrayOfTasks;
    refreshTasks: () => Promise<any[]>;
    createTask: any;
    updateTask: any;
    deleteTask: any;
    userData: any;
    getUserData: () => Promise<object | Error>;
    updateTaskList: any;
    appIsLoading: boolean;
    setAppIsLoading: any;
    doneRefresh: boolean;
    setRefreshStatus: any;
    getTasks: any;
}

/**
 * Used in listView to specify arrays that contain tasks
 * to be outputted in their respective lists.
 */
export type GroupType = Array<{
    title: string;
}>;

/**
 * Used for props of TaskList component
 */
export type TaskListProps = {
    title: string;
    listId: number; // to double check the task progress
    children: any;
    style?: object;
};

/**
 * Props used in TaskBtn component
 */
export interface TaskBtnProps {
    title: string;
    tags: object[];
    style?: any;
    showAnim?: boolean;
    pos?: number;
    taskId: string;
}

/**
 * API - Types for creating a new task with DAO
 */
export interface NewTaskConfig {
    userId: string;
    newRecord: Task;
}

/**
 * Types for the "fields" object that's returned from Airtable
 */
export interface CreatedTask {
    dbId: string | number;
    data: {
        taskId: string;
        userId: string | number;
        data: string;
    };
}

/**
 * What the API returns when a new task is created.
 */
export interface APINewTaskReturned {
    msg: {
        dbId: string | number;
        userId: string;
        id: string | number;
        name: string;
        description: string;
        properties: {
            startDate: string;
            endDate: string;
            timeZone: string;
            tags: Tags | any[];
        };
        progress: number;
    };
}
export interface APIReturnedTask {
    dbId: string | number;
    userId: string;
    id: string | number;
    name: string;
    description: string;
    properties: {
        startDate: string;
        endDate: string;
        timeZone: string;
        tags: Tags | any[];
    };
    progress: number;
}
/**
 * Used for storage in context
 */
export type APIReturnedTasks = APIReturnedTask[];

/**
 * Used when sending the new task to the API server
 *
 * Contains optional properties that have defaults on
 * the server.
 */
export interface ContextCreateTask {
    id: string | number;
    name: string;
    description: string;
    properties: {
        tags?: Tags;
        startDate?: string;
        endDate?: string;
        timeZone?: string;
    };
}
