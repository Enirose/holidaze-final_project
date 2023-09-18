import { useNavigate } from "react-router-dom";
import { venuesUrl } from "../../components/constants/constantsUrl";
import { load } from "../../components/localStorage";


export async function CreateVenue () {
    const method = 'post';
    const token = load('token');
    const createVenueUrl = `${venuesUrl}`;
    const venueData = {
        name, description, media, price, maxGuest, meta, location
    };
    const navigate = useNavigate();

    try {
      const response = await fetch (createVenueUrl, {
        method,
        headers: {
            'Content-Type': 'Application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(venueData),
      });

        const venueResult = await response.json();

        if (response.ok){
            navigate("/profile");
            return venueResult;

        } else {
            alert('Something went wrong! Try again later');
        }
    } catch (error) { 
        alert ("Soemthing went wrong! Try again later");
    }
}