import { tasks } from "demo";
import type { NextApiRequest, NextApiResponse } from 'next';
/*

TODO: User login authentication

*/

// GET request
export default function getAllTasks (req: NextApiRequest, res: NextApiResponse) {
    return res.status(200).json(tasks);
};