import CheckOwnership from "./middleware/CheckOwnership";
import UpdateTask from "./dao/tasks/updateTask";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function ProtectedRoute(req, res) {
    try {
        const isOwner = await CheckOwnership(req, res);
        if (isOwner) {
            const result = await UpdateTask(req, res);
            return res.status(result ? 200 : 500).json({ msg: result ? "Success" : "Error" });
        } else return res.status(500).json({ msg: "Error" });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ msg: "Error" });
    }
});
