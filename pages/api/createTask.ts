import createTask from "./dao/tasks/createTask";
import getUserId from "./dao/user/getUserId";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { uuid } from "uuidv4";

export default withApiAuthRequired(async function ProtectedRoute(req: NextApiRequest, res: NextApiResponse) {
    const session = getSession(req, res);
    console.log(req.body);
    /*
    try {
        const userId = await getUserId(session);
        if (!session) return res.status(400).json({ msg: "Not logged in." });
        const result = await createTask(session, {
            userId: userId,
            newRecord: {
                id: req.body.id || uuid(),
                name: req.body.name || "Untitled",
                description: req.body.description || "",
                properties: {
                    tags: req.body.properties.tags || [],
                },
                progress: 0, // default to "Not Started", maybe have this user-configurable later?
            },
        });
        const { dbId, data } = result;
        const parse = JSON.parse(data.data);
        res.status(200).json({
            msg: {
                dbId: dbId,
                userId: data.userId,
                id: data.taskId,
                name: parse.name,
                description: parse.description,
                properties: {
                    startDate: parse.startDate || "",
                    endDate: parse.endDate || "",
                    timeZone: parse.timeZone || "",
                    tags: parse.tags || [],
                },
                progress: parse.progress,
            },
        });
    } catch (err) {
        res.status(500).json({msg: 'Error'});
    }*/
});
