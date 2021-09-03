/**
 * Each Task record has this data structure
 */
export interface Task {
    id: string | number;
    dbId?: string | number; // airtable-specific
    userId?: string | number;
    name: string;
    description: string;
    properties: {
        startDate?: string;
        endDate?: string;
        timeZone?: string;
        tags?: Array<{ urgent: boolean; name: string }>;
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
    tasks: any[];
    refreshTasks: () => Promise<any[]>;
    addTask: any;
    updateTask: any;
    userData: any;
    getUserData: () => Promise<object | Error>;
}

/**
 * Used in listView to specify arrays that contain tasks
 * to be outputted in their respective lists.
 */
export type GroupType = Array<{
    title: string;
    children: ArrayOfTasks;
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
    taskId: number;
    progress?: number;
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
