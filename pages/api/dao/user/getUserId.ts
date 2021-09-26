import { Session } from "@auth0/nextjs-auth0";
import jwt_decode, { JwtPayload } from "jwt-decode";

const userId = `https://tasktrak.io/userId`;
/**
 * Get the User's ID
 * @param session - Auth0 Session
 * @returns String - userId
 */
export default async function getUserId (session: Session): Promise<string> {
    if(!session) return Promise.reject('Invalid session.');
    const decoded = await jwt_decode<JwtPayload>(session.idToken);
    return decoded[userId];
}