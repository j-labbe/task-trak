import CheckOwnership from "./middleware/CheckOwnership";
import UpdateTask from "./dao/tasks/updateTask";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function ProtectedRoute(req, res) {
    CheckOwnership(req, res).then(() => {
        UpdateTask(req, res);
    }).catch((e) => {
        console.error(e);
        res.status(500).json({ msg: "Error" });
    });
});
