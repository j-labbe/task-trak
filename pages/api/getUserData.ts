import { getUserData } from "./dao/userDao";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const data: object = await getUserData(); // await for future use
    return res.status(200).json(data);
}