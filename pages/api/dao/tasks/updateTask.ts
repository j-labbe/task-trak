import { table } from "utils/airtable";
import getUserId from "../user/getUserId";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "@auth0/nextjs-auth0";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const session = getSession(req, res);
    const userId = await getUserId(session);
    if (!session) return res.status(401).json({ msg: "Unauthorized." });
    const { dbId, data } = req.body;

    try {
        const newInfo = { ...data, userId: userId };
        const updatedRecord = await table.update([{id: dbId, fields: newInfo}]);
        res.status(200).json({msg: updatedRecord});
    } catch (err) {
        console.error(err);
        res.status(500).json({msg: 'Error'});
    }
}
