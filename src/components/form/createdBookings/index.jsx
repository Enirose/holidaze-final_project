import React from "react";
import { Card, Container, ListGroup } from "react-bootstrap";
import useApi from "../../hooks/useApi";
import { bookingUrl } from "../../constants/constantsUrl";
import { load } from "../../localStorage";

export default function CreatedBookingFormListener() {
  const UserName = load("user");
  const userBookingUrl = "?_bookings=true&_owner=true";
  const { data, isLoading, isError } = useApi(`${bookingUrl}/${UserName.name}${userBookingUrl}`);
  //const bookings = Array.isArray(data) ? data : [];
  //const booking changed to if(!Array....)


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  // Check if data is an array of bookings
  if (!Array.isArray(data)) {
    return <div>No bookings found.</div>;
  }

  return (
    <Container>
      <h2>Your Bookings</h2>
      <ListGroup>
        {data.map((booking) => (
          <ListGroup.Item key={booking.id}>
            <Card>
              <Card.Body>
                <Card.Title>Booking ID: {booking.id}</Card.Title>
                <Card.Text>
                  <p>From: {booking.dateFrom}</p>
                  <p>To: {booking.dateTo}</p>
                  <p>Guests: {booking.guests}</p>
                  <p>Created: {booking.created}</p>
                  <p>Updated: {booking.updated}</p>
                </Card.Text>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

