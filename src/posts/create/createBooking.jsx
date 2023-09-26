import { bookingUrl } from "../../components/constants/constantsUrl"
import { load } from "../../components/localStorage"


export async function CreateBooking(bookingData) {
    const method = 'post'
    const token = load('token')
    const createBookingUrl = `${bookingUrl}`;

    try {
        const response = await fetch (createBookingUrl, {
            method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(bookingData),
        });

        const bookingResult = await response.json();

        if (response.ok) {

            return bookingResult;

        } else {
            alert('Something went wrong! Try again!');
        }
    } catch (error) {
        alert ('Something went wrong! Try again later!');
    }
}