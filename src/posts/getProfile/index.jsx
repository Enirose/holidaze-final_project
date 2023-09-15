import { profileUrl } from "../../components/constants/constantsUrl";
import { load } from "../../components/localStorage";



export async function FetchUserProfile (name) {
    const method = "get";
    const token = load('token');
    const profileUrlName = `${profileUrl}/${name}`

    try {
        const response = await fetch ( profileUrlName, {
            method,
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new error('Error while fetching user profile');
        }

    } catch (error) {
        throw new error('Error fetching user profile', error);
    }
};