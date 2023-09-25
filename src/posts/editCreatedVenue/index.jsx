import { venuesUrl } from "../../components/constants/constantsUrl";
import { load } from "../../components/localStorage";


export async function EditVenue(id, data) {
    const method = 'put';
    const token = load('user');
    // const { id } = userName;
    const venueUpdateUrl = `${venuesUrl}/${id}`;

    try {
        const response = await fetch(venueUpdateUrl, {
            method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data)
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