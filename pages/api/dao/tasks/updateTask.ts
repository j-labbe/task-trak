import { table } from "utils/airtable";
import getUserId from "../user/getUserId";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "@auth0/nextjs-auth0";

export default async function updateTask (req: NextApiRequest, res: NextApiResponse) {
    const session = getSession(req, res);
    const userId = await getUserId(session);
    if (!session || !userId) return false;
    // req.record is set from CheckOwnership
    // It contains the referenced record (if the user is owner / record exists)
    // @ts-ignore
    const dbId = req.record.id;
    try {
        const rec = [
            { 
                id: dbId, 
                fields: {
                    // @ts-ignore
                    taskId: req.record.fields.taskId,
                    userId: userId,
                    data: JSON.stringify(req.body)
                }
            }
        ]
        await table.update(rec);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}
