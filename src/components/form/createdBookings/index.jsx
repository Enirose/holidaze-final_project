
// BookingsDisplay.js
import React from 'react';
import { Container, ListGroup, Card } from 'react-bootstrap';
import { profileUrl } from '../../constants/constantsUrl';
import { load } from '../../localStorage';
import useApi from '../../hooks/useApi';

export default function BookingsDisplay() {
  const userData = load('user');
  // const { name } = userData;
  const userBookingUrl = `${userData.name}?_bookings=true&_owner=true`;

  const { data, isLoading, isError } = useApi (`${profileUrl}${userBookingUrl}`);


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  if (!Array.isArray(data)) {
    console.log("No bookings found.");
    return (
      <Container>
        <h2>Your Bookings</h2>
        <div>No bookings found.</div>
      </Container>
    );
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
                  From: {booking.dateFrom}
                </Card.Text>
                <Card.Text>
                  To: {booking.dateTo}
                </Card.Text>
                <Card.Text>
                  Guests: {booking.guests}
                </Card.Text>
                <Card.Text>
                  Created: {booking.created}
                </Card.Text>
                <Card.Text>
                  Updated: {booking.updated}
                </Card.Text>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}
