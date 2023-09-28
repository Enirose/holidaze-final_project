
// BookingsDisplay.js
import React from 'react';
import { Container, ListGroup, Card, Image, Button } from 'react-bootstrap';
import { profileUrl } from '../../constants/constantsUrl';
import { load } from '../../localStorage';
import useApi from '../../hooks/useApi';
import { Link } from 'react-router-dom';
import formatDate from '../../formatDate';
import { DeleteBooking } from '../../../posts/deleteBooking';

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

  // Function to handle deleting a venue
    const handleDeleteBooking = async (bookingId) => {
        if (window.confirm("Are you sure you want to delete this booking?")) {

        try {
            const response = await DeleteBooking(bookingId);

            if (response.ok) {
                location.reload();
            } else {
            console.error('Failed to delete the booking');
            }
        } catch (error) {
            console.error('Error deleting the booking', error);
        }
        }
    };


 
  const bookings = data?.bookings || [];
 
  return (
    <Container>
      <h2>Your Bookings</h2>
      {bookings.length > 0 ? (
        <ListGroup>
          {bookings.map((booking) => (
            <ListGroup.Item key={booking.id}>
              <Link to={`/venue/${booking.venue.id}`} key={booking.id}>
                <Card>
                  <Card.Body>
                    <h1> {booking.venue.name}</h1>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                      {booking.venue.media && booking.venue.media.length > 0 ? (
                        <Image
                          src={booking.venue.media[0]}
                          alt={`Image for booking ID: ${booking.id}`}
                          style={{ maxWidth: '50%', maxHeight: '100%', width: 'auto', height: 'auto' }}
                        />
                      ) : (
                        <Image
                          src="placeholder-image-url.jpg"
                          alt="Placeholder Image"
                          style={{ maxWidth: '50%', maxHeight: '50%', width: 'auto', height: 'auto' }}
                        />
                      )}
                    </div>
                    <Card.Text>
                      Owner: {booking.venue.owner}
                    </Card.Text>
                    <Card.Text>
                      From: {formatDate (booking.dateFrom)}
                    </Card.Text>
                    <Card.Text>
                      To: {formatDate(booking.dateTo)}
                    </Card.Text>
                    <Card.Text>
                      Guests: {booking.guests}
                    </Card.Text>
                    <Card.Text>
                      Total: NOK {booking.venue.price}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
              <Button variant="danger" onClick={() => handleDeleteBooking(booking.id)}>Delete Booking</Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <div>No bookings found!</div>
      )}
    </Container>
  );
}