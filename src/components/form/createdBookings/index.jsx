import React from 'react';
import { Container, ListGroup, Card, Image, Button, Row, Col } from 'react-bootstrap';
import { profileUrl } from '../../constants/constantsUrl';
import { load } from '../../localStorage';
import useApi from '../../hooks/useApi';
import { Link } from 'react-router-dom';
import formatDate from '../../formatDate';
import { DeleteBooking } from '../../../posts/deleteBooking';
import Loader from '../../loader';
import { BsPeopleFill } from 'react-icons/bs';

export default function BookingsDisplay() {
  const userData = load('user');
  // const { name } = userData;
  const userBookingUrl = `${userData.name}?_bookings=true&_owner=true`;
  const { data, isLoading, isError } = useApi (`${profileUrl}${userBookingUrl}`);

  if (isLoading) {
    return <Loader/>
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
                <div>
                    {bookings.map((booking) => (
                        <ListGroup.Item key={booking.id}>
                            <Card>
                                <Row>
                                    <Col md={4} className="d-flex justify-content-center align-items-center">
                                    <Link to={`/venue/${booking.venue.id}`}>
                                        {booking.venue.media && booking.venue.media.length > 0 ? (
                                        <Image
                                            src={booking.venue.media[0]}
                                            alt={`Your next destination: ${booking.venue.id}`}
                                            style={{ maxWidth: '100%', maxHeight: '100%' }}
                                        />
                                        ) : (
                                        <Image src="" alt={booking.venue.name} />
                                        )}
                                    </Link>
                                    </Col>
                                    <Col md={5}>
                                        <Card.Body>
                                            <h1>{booking.venue.name}</h1>
                                            <Card.Text>
                                              From: {formatDate (booking.dateFrom)}
                                            </Card.Text>
                                            <Card.Text>
                                              To: {formatDate(booking.dateTo)}
                                            </Card.Text>
                                            <Card.Text>
                                              <BsPeopleFill/> {booking.guests}
                                            </Card.Text>
                                            <Card.Text>
                                              <b>Total: NOK {booking.venue.price} </b>
                                            </Card.Text>
                                        </Card.Body>
                                    </Col>
                                    <Col md={3}>
                                        <Card.Body className="" >   
                                          <Button variant="danger" onClick={() => handleDeleteBooking(booking.id)}>Delete Booking</Button>                                      
                                        </Card.Body>
                                    </Col>
                                </Row>
                            </Card>
                        </ListGroup.Item>
                    ))}
                </div>
            ) : (
                <div>No venues found. </div>
            )}
        </Container>
    );
}