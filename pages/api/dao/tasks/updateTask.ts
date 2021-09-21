import { table } from "utils/airtable";
import getUserId from "../user/getUserId";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "@auth0/nextjs-auth0";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const session = getSession(req, res);
    const userId = await getUserId(session);
    if (!session || !userId) return res.status(401).json({ msg: "Unauthorized." });
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
        return res.status(200).json({ msg: "Success" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Error" });
    }
}
