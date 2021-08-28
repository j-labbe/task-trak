import { tasks } from "../../demo";
import type { NextApiRequest, NextApiResponse } from 'next';

/*

TODO: User login authetntication

*/


// POST request
const getTask = (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.body) {
        return res.status(400).json({
            messageType: 'error',
            message: 'Invalid input'
        });
    }
    if(!req.body.taskId) {
        return res.status(400).json({
            messageType: 'error',
            message: 'Invalid taskId'
        });
    }
    
    const taskId = req.body.taskId - 1;

    if(tasks[taskId] === undefined){
        return res.status(400).json({ 
            messageType: 'error',
            message: 'Requested task does not exist'
        })
    }else{
        return res.status(200).json(tasks[taskId]);
    }
}

export default getTask;