import { tasks } from "demo";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import jwt_decode, { JwtPayload } from "jwt-decode";

const userId = process.env.AUTH0_NAMESPACE_BASE + "userId";

export default withApiAuthRequired(function ProtectedRoute(req: NextApiRequest, res: NextApiResponse) {
    const session = getSession(req, res);
    const decoded = jwt_decode<JwtPayload>(session.idToken);
    // This is the userId we're going to use to fetch tasks from airtable
    const decodedUserId = decoded[userId];
    res.send(200);
});
