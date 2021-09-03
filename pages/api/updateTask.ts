import CheckOwnership from "./middleware/CheckOwnership";
import UpdateTask from "./dao/tasks/updateTask";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default withApiAuthRequired(async function ProtectedRoute(req, res) {
    CheckOwnership(UpdateTask);
});
