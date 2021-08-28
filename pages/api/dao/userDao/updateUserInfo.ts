import { uid, userInfo } from "../../../../demo";

// Demo data is acting as the database. Eventually, a real db will be in place

const updateUserData = ({ userId, username = undefined, firstName = undefined, password = undefined }) => {

    // eventually we're only going to update the user with specified user id. For now, 

    if (!userId) return new Error('userId is required.');
    if (!username && !firstName && !password) return new Error('Updated user information is required.');

    if (username) {
        userInfo.username = username;
    }
    if (firstName) {
        userInfo.firstName = firstName;
    }
    if (password) {
        userInfo.password = password;
    }

    return userInfo;
}

export default updateUserData;