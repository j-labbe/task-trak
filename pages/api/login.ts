import auth0 from './auth/auth0';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function(req: NextApiRequest, res: NextApiResponse) {
    try {
        await auth0.handleLogin(req, res);
    } catch(err) {
        res.status(err.stats || 500).end(err.message);
    }
}