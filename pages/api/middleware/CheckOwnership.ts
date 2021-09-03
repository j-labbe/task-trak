import { table } from "utils/airtable";
import { getSession } from "@auth0/nextjs-auth0";
import getUserId from "../dao/user/getUserId";
import { NextApiRequest, NextApiResponse } from "next";

export default (handler) => async (req: NextApiRequest, res: NextApiResponse) => {
    const session = getSession(req, res);
    const userId = getUserId(session);
    if (!session || !userId) return res.status(401).json({ msg: "Invalid session." });
    const { dbId } = req.body;
    try {
        const existingRecord = await table.find(dbId);
        if (!existingRecord || userId !== existingRecord[0].fields.userId) {
            return res.status(404).json({ msg: "Record not found" });
        }
        // @ts-ignore
        req.record = existingRecord;
        return handler(req, res);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Error" });
    }
};