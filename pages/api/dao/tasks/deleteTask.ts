import { table } from "utils/airtable";
import { Session } from "@auth0/nextjs-auth0";

export default async function (session: Session, id: any): Promise<boolean> {
    if(!session) return Promise.reject("Invalid session.");
    try {
        const del = await table.destroy(id);
        if(del) return true;
        else return false;
    }catch(e){
        return Promise.reject(e);
    }
}
