import { table } from "utils/airtable";
import { uuid } from "uuidv4";
import { NewTaskConfig } from "types";

export default async function (config: NewTaskConfig): Promise<object> {
    const assignedTaskId = uuid();
    config.newRecord.id = assignedTaskId;
    try {
        const newTask = await table.create([
            {
                fields: {
                    taskId: assignedTaskId,
                    userId: config.userId,
                    data: JSON.stringify(config.newRecord)
                }
            }
        ]);
        return {data: newTask[0].fields}
    }catch(e){
        return Promise.reject(e);
    }
}
// LAST LEFT OFF: rewriting basic parts of API
// TODO: updateTask (dao), deleteTask(dao, with alertbox confirm)
//      api routes
//      update UI portion as necessary
//      finish dnd now that we're loading data from airtable
//      work on other views
//      homepage
//      release 1 merge and deploy
