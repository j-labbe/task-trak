import { table, getMinifiedRecord, minifyRecords } from "utils/airtable";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import jwt_decode, { JwtPayload } from "jwt-decode";

const userId = process.env.AUTH0_NAMESPACE_BASE + "userId";

// We need the req and res parameters to find the
export default withApiAuthRequired(async function ProtectedRoute(req: NextApiRequest, res: NextApiResponse) {
    const session = getSession(req, res);
    const decoded = jwt_decode<JwtPayload>(session.idToken);
    // This is the userId we're going to use to fetch tasks from airtable
    const decodedUserId = decoded[userId];

    try {
        const records = await table.select({
            filterByFormula: `userId = '${decodedUserId}'`
        }).firstPage();
        const formattedRecords = minifyRecords(records);
        return formattedRecords;
    }catch(e){

    }
})