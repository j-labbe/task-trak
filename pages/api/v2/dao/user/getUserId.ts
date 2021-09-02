import jwt_decode, { JwtPayload } from "jwt-decode";

const userId = `${process.env.AUTH0_NAMESPACE_BASE}/userId`;

/**
 * Get the User's ID
 * @param session - Auth0 Session
 * @returns String - userId
 */
export default async function getUserId (session): Promise<string> {
    if(!session) return Promise.reject('Invalid session.');
    const decoded = jwt_decode<JwtPayload>(session.idToken);
    return decoded[userId];
}