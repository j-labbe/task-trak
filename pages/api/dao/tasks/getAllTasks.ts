import { Session } from "@auth0/nextjs-auth0";
import { table, getMinifiedRecord, minifyRecords } from "utils/airtable";
import getUserId from "../user/getUserId";

export default async function getAllTasks (session: Session): Promise<any> {
    try {
        const decodedUserId = await getUserId(session);
        const records = await table
            .select({
                filterByFormula: `userId = '${decodedUserId}'`,
            })
            .firstPage();
        const formattedRecords = minifyRecords(records);
        return formattedRecords;
    } catch (e) {
        return Promise.reject(e);
    }
}
