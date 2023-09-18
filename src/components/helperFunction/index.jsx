import { load } from "../localStorage";

/**
 * Fetch user info
 * @returns 
 */

export default function getUserInfo() {
    const userInfo = load('user');
    return userInfo;
};


/**
 * fetch user Name
 * @returns 
 */
export default function getUserName () {
    const userData = getUserInfo('user');
    return userData.name;
};


/**
 * Replace/update user avatar
 */
export default function replaceAvatar() {
    const user = getUserInfo ();
    if (user.avatar != null && user.avatar != '') {
        currentAvatar.src = user.avatar;
    }
};