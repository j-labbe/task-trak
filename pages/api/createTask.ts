import createTask from "./dao/tasks/createTask";
import getUserId from "./dao/user/getUserId";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 } from "uuid";

export default withApiAuthRequired(async function ProtectedRoute(req: NextApiRequest, res: NextApiResponse) {
    const session = getSession(req, res);
    try {
        const userId = await getUserId(session);
        if (!session) return res.status(400).json({ msg: "Not logged in." });
        const receivedData = req.body.data;
        const result = await createTask(session, {
            userId: userId,
            newRecord: {
                id: receivedData.id ? receivedData.id : v4(),
                name: receivedData.name ? receivedData.name : "Untitled",
                description: receivedData.description ? receivedData.description : "",
                properties: {
                    tags: receivedData.properties.tags ? receivedData.properties.tags : [],
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
                    startDate: parse.properties.startDate || "",
                    endDate: parse.properties.endDate || "",
                    timeZone: parse.properties.timeZone || "",
                    tags: parse.properties.tags || [],
                },
                progress: parse.progress,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error" });
    }
});
