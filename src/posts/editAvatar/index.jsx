import { profileUrl } from "../../components/constants/constantsUrl";
import { load } from "../../components/localStorage";


export async function UpdateAvatar(avatarData) {
    const method = 'put';
    const name = await load('user')
    const avatarUrl = `${profileUrl}${name}/media`;

    try {
        const response = await fetch (avatarUrl, {
        method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ${token}'
        },
        body: JSON.stringify(avatarData),
     });

        if (response.ok) {
            console.log('Avatar update successful');
            return true;
        } else {
            console.error('Avatar update failed with status:', response.status);
            return false;
        }

    } catch (error) {
        console.error('Error updating avatar:', error);
        return false;
    }    
};