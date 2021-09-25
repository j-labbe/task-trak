import deleteTask from "./dao/tasks/deleteTask";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default withApiAuthRequired(async function ProtectedRoute(req: NextApiRequest, res: NextApiResponse) {
    try {
        const session = getSession(req, res);
        if (!session) return res.status(400).json({ msg: "Not logged in." });
        const { dbId } = req.body;
        const result = await deleteTask(session, dbId);
        if (result) return res.status(200).json({ msg: "Task successfully deleted." });
        return res.status(304).json({ msg: "Task not deleted." });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ msg: "Error" });
    }
});
