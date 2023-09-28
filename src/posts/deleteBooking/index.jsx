import { bookingUrl } from "../../components/constants/constantsUrl";
import { load } from "../../components/localStorage";

export async function DeleteBooking(bookingId) {
    const method = 'delete';
    const token = load('token');
    const bookingDeleteUrl = `${bookingUrl}/${bookingId}`;

     try {
        const response = await fetch(bookingDeleteUrl, {
            method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        return response;
    } catch (error) {
        console.error('Error deleting the booking', error);
        throw error;
    }
}