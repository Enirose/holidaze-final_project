import { load } from "../../localStorage";
import useApi from "../../hooks/useApi";
import { profileUrl } from "../../constants/constantsUrl";


export default function VenueWithBookingInfo () {
    const userData = load('user');
    const {name} = userData;
    const venuesBookingUrl = `${name}/venues/?_bookings=true&_owner=true`;
    const {data, isLoading, isError} = useApi(`${profileUrl}${venuesBookingUrl}`);

    if(isLoading) {
        return <div>
            Loading....
        </div>
    }

    if (isError) {
        return <div>
            Something went wrong!
        </div>
    }

    const bookings = data.bookings || [];

    return (
         bookings ? (
            <div>
                <h5>Booking Information</h5>
                <ul>
                    {bookings.map((booking, index) => (
                        <li key={index}>
                            From: {booking.dateFrom}, to: {booking.dateTo}, Guests: {booking.guests}
                        </li>
                    ))}
                </ul>
            </div>
        ) : (
            <p>Loading booking information...</p>
        )
    );
}





