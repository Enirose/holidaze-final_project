import { venuesUrl } from "../../components/constants/constantsUrl"
// import { load } from "../../components/localStorage"


export async function FetchSingleVenue (id) {
    // const method = 'get'
    // const token = load('token')
    const VenueById = `${venuesUrl}/${id}`;

    try {
        const response = await fetch(VenueById)

        if (response.ok) {
            const venueData = await response.json();
            return venueData;
        } else {
            alert('Something went wrong! Try again later');
        }
    }catch (error) {
        alert('Something went wrong! Try again later');
    }
}