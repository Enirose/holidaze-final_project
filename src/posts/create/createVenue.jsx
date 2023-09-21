import { venuesUrl } from "../../components/constants/constantsUrl";
import { load } from "../../components/localStorage";


export async function CreateVenue (venueData) {
    const method = 'post';
    const token = load('token');
    const createVenueUrl = `${venuesUrl}`;


    try {
      const response = await fetch (createVenueUrl, {
        method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(venueData),
      });

        const venueResult = await response.json();

        if (response.ok){

            return venueResult;

        } else {
            alert('Something went wrong! Try again later');
        }
    } catch (error) { 
        alert ("Something went wrong! Try again later");
    }
}