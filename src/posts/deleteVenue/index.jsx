import { venuesUrl } from "../../components/constants/constantsUrl";
import { load } from "../../components/localStorage";


export async function DeleteVenue(venueId) {
    const method = 'Delete';
    const token = load('token');
    const venueDeleteUrl = `${venuesUrl}/${venueId}`;

    try {
        const response = await fetch (venueDeleteUrl, {
            method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        return response;
    } catch (error) {
        console.error('Error deleting the venue', error);
        throw error;
    }
}