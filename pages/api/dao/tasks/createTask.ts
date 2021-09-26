import { table } from "utils/airtable";
import { v4 } from "uuid";
import { CreatedTask, NewTaskConfig } from "types";
import { Session } from "@auth0/nextjs-auth0";

export default async function createTask (session: Session, config: NewTaskConfig): Promise<CreatedTask> {
    if(!session) return Promise.reject('Invalid session.'); // may be redundant ¯\_(ツ)_/¯
    try {
        const newTask = await table.create([
            {
                fields: {
                    taskId: config.newRecord.id.toString(), // non-airtable specific identifier
                    userId: config.userId.toString(), // user's userId from auth0 metadata (or equiv. authentication)
                    data: JSON.stringify(config.newRecord) // contains all the task data, taskId will be redundant (fine)
                }
            }
        ]);
        /**
         * Reminder: this is only used for accessing the database.
         * 
         * dbId will be put in the final returned task object later.
         * 
         * When a new record is created, there should be no dbId passed
         * to airtable. dbId is an airtable-specific record number that
         * is only used by airtable. For the sake of redundancy, each task
         * has it's own taskId that is separate from any other id number to
         * preserve the format, should the need to switch databases is required
         * later.
         */
        // @ts-ignore
        return {dbId: newTask[0].getId(), data: newTask[0].fields}
    }catch(e){
        return Promise.reject(e);
    }
}