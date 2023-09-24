import { venuesUrl } from "../../components/constants/constantsUrl"
import { load } from "../../components/localStorage"


export async function FetchSingleVenue () {
    const method = 'get'
    const id = load('token')
    const VenueById = `${venuesUrl}/${id}`;

    try {
        const response = await fetch(VenueById, {
            method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(id)
        });

        const venueData = await response.json();

        if (response.ok) {
            return venueData;
        } else {
            alert('Something went wrong! Try again later');
        }
    }catch (error) {
        alert('Something went wrong! Try again later');
    }
}