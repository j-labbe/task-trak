import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import getUserId from "./dao/user/getUserId";

export default withApiAuthRequired(async function(req: NextApiRequest, res: NextApiResponse) {
    const session = getSession(req, res);
    try{
        const userId = await getUserId(session);
        console.log(userId, session);
        res.status(200).json({
            msg: {
                userId: userId,
                firstName: session.user.given_name,
                email: session.user.email,
                loginMethod: session.user.sub.split('|')[0],
                locale: session.user.locale
            }
        });
    }catch(e){
        console.error(e);
        res.status(500).json({ msg: 'Error' });
    }
})