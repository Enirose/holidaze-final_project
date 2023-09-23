
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

  // Check if 'data' contains the bookings property
  // if (!data.hasOwnProperty('bookings') || data.bookings.length === 0) {
  //   console.log(data);
  //   return (
  //     <Container>
  //       <h2>Your Bookings</h2>
  //       <div>No bookings found.</div>
  //     </Container>
  //   );
  // }
 
  const bookings = data?.bookings || [];

  return (
    <Container>
      <h2>Your Bookings</h2>
      {bookings.length > 0 ? (
        <ListGroup>
          {bookings.map((booking) => (
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
      ) : (
        <div>No bookings found.</div>
      )}
    </Container>
  );
}
  // return (
  //   <Container>
  //     <h2>Your Bookings</h2>
  //     <ListGroup>
  //       {data.bookings.map((booking) => (
  //         <ListGroup.Item key={booking.id}>
  //           <Card>
  //             <Card.Body>
  //               <Card.Title>Booking ID: {booking.id}</Card.Title>
  //               <Card.Text>
  //                 From: {booking.dateFrom}
  //               </Card.Text>
  //               <Card.Text>
  //                 To: {booking.dateTo}
  //               </Card.Text>
  //               <Card.Text>
  //                 Guests: {booking.guests}
  //               </Card.Text>
  //               <Card.Text>
  //                 Created: {booking.created}
  //               </Card.Text>
  //               <Card.Text>
  //                 Updated: {booking.updated}
  //               </Card.Text>
  //             </Card.Body>
  //           </Card>
  //         </ListGroup.Item>
  //       ))}
  //     </ListGroup>
  //   </Container>
  // );

  


