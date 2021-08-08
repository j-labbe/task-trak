import { tasks } from "../../demo/data";

/*

TODO: User login authetntication

*/

// GET request
const getAllTasks = (req, res) => {
    return res.status(200).json(tasks);
};

export default getAllTasks;