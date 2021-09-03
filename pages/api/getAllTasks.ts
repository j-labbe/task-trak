import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import getAllTasks from "./dao/tasks/getAllTasks";

export default withApiAuthRequired(async function ProtectedRoute(req: NextApiRequest, res: NextApiResponse) {
    const session = getSession(req, res);
    try {
        const tasks = await getAllTasks(session);
        console.log(tasks);
        return res.status(200).json({ msg: tasks });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: err });
    }
});
