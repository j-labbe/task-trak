import { uid, userInfo } from "@demo";

// Demo data is acting as the database. Eventually, a real db will be in place

// We're going to want to only return db user data for the user that's logged in

const getUserData = () => {
    return (userInfo);
};

export default getUserData;