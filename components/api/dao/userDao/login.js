import { userInfo } from '../../../../demo/data';

// we make a default error message to make attackers
// frustrated
const ERROR_MSG = 'Invalid username or password.';

const login = (username, password) => {
    if(!username || !password) return new Error(ERROR_MSG);

    if(userInfo.username === username && userInfo.password === password){
        userInfo.lastLogin = Date.now();
        return userInfo;
    }else return new Error(ERROR_MSG);
}

export default login;