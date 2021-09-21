import { table } from "utils/airtable";
import { getSession } from "@auth0/nextjs-auth0";
import getUserId from "../dao/user/getUserId";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const session = getSession(req, res);
    const userId = await getUserId(session);
    if (!session || !userId) return res.status(401).json({ msg: "Invalid session." });
    const { dbId } = req.body;
    try {
        const existingRecord = await table.find(dbId);
        if (!existingRecord || userId !== existingRecord.fields.userId) {
            return Promise.reject("Record not found");
        }
        // @ts-ignore
        req.record = existingRecord;
        Promise.resolve();
    } catch (err) {
        return Promise.reject(err);
    }
};