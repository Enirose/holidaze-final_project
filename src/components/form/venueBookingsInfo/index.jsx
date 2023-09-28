import React from "react";
import { useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { venuesUrl } from "../../constants/constantsUrl";
import { Dropdown, ListGroup } from "react-bootstrap";

export default function VenueWithBookingInfo({venueId}) {
  const ownerUrl = "?_bookings=true&owner=true";
  const { data, isLoading, isError } = useApi(`${venuesUrl}/${venueId}${ownerUrl}`);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  if (!data || !data.bookings || data.bookings.length === 0) {
    return <p>No booking information available.</p>;
  }

  const { bookings } = data;

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Bookings Information
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <div>
          <ListGroup.Item>
            <div>
              <ul>
                {bookings.map((booking, index) => (
                  <li key={index}>
                    <b>From: </b>{new Date(booking.dateFrom).toLocaleDateString()} -
                    <b>To: </b>{new Date(booking.dateTo).toLocaleDateString()} §
                    <b>Guests: {booking.guests} </b>
                  </li>
                ))}
              </ul>
            </div>
          </ListGroup.Item>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
}
