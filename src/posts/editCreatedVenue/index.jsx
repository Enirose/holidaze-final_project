import { venuesUrl } from "../../components/constants/constantsUrl";
import { load } from "../../components/localStorage";


export async function EditVenue() {
    const method = 'put';
    const userName = load('user');
    const { name } = userName;
    const venueUpdateUrl = `${venuesUrl}/${name}`;
    
    try {
        const response = await fetch(venueUpdateUrl, {
            method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(venueUpdateUrl)
        });

        if (response.ok) {
            console.log('Successfully updated venue');
            return true;
        } else {
            console.log('Failed updating the venue');
            return false;
        }
    } catch (error) {
        console.log('Error updating the venue');
        return false;
    }
}