import React from "react";
import useApi from "../../components/hooks/useApi";
import { venuesUrl } from "../../components/constants/constantsUrl";
import { Card, Container, Row, Col, Carousel, Dropdown, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import BookDateByCalendar from "../../components/form/bookVenue";
import { load } from "../../components/localStorage";

export default function SpecificVenue() {
  const { id } = useParams();
  const ownerUrl = "?_bookings=true&_owner=true";
  const { data, isLoading, isError } = useApi(`${venuesUrl}/${id}${ownerUrl}`);

  const currentUser = load('user');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  const {
    name,
    media,
    description,
    location,
    price,
    maxGuests,
    meta,
    owner,
    bookings
  } = data;

  // Check if media is an array and contains at least one element
//   const mediaUrl = Array.isArray(media) && media.length > 1 ? media[0] : '';

  // Check if owner exists and contains a name property
  const ownerName = owner && owner.name ? owner.name : 'Owner information not available';

  // Check if location exists and contains the country and city property
  const locationCountry = location && location.country ? location.country : '';
  const locationCity = location && location.city ? location.city : '';

  // Check if meta object exists and extract properties
  const parkingIncluded = meta && meta.parking ? "Parking: Yes" : "Parking: No";
  const wifiIncluded = meta && meta.wifi ? "Wifi: Yes" : "Wifi: No";
  const breakfastIncluded = meta && meta.breakfast
    ? "Breakfast: Yes"
    : "Breakfast: No";

  

  // const handleBookVenue = () => {
  //   HandleBookVenue(checkInDate, checkOutDate, totalAmount, totalGuests, id, maxGuests);
  // };

  // useEffect(() => {
  //   const bookingData = JSON.parse(load("bookingData"));

  //   if (bookingData) {
  //     // Display the booked dates, total price, and total guests
  //     setCheckInDate(new Date(bookingData.checkInDate));
  //     setCheckOutDate(new Date(bookingData.checkOutDate));
  //     setTotalAmount(bookingData.totalPrice);
  //     setTotalGuests(bookingData.totalGuests);
  //   }
  // }, []);

  const isOwner = currentUser && currentUser.name === ownerName;

  return (
    <Container className="mb-4">
      <Row>
        <Col>
          <Card key={id} className="mb-4">
            {media && media.length > 1 ? (
              <Carousel>
                {media.map((image, index) => (
                  <Carousel.Item key={index} interval={5000}>
                    <img
                      className="d-block w-100 h-10"
                      src={image}
                      alt={name}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : media && media.length === 1 ? ( // Check if media is defined and has exactly one element
              <Card.Img
                variant="top"
                src={media[0]}
                alt={name}
                className="mb-4 d-block h-10"
              />
            ) : (
              // Add a placeholder or message when media is empty
              <div>No images available</div>
            )}
            {/* <Card.Img
              variant="top"
              src={mediaUrl}
              alt={name}
              className="mb-4 d-block h-10"
            /> */}
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text>{description}</Card.Text>
              <Card.Text>Owner: {ownerName}</Card.Text> {/* Display owner's name or a message if not available */}
              <Card.Text>Location: {locationCity},  {locationCountry}</Card.Text>
              <Card.Text>Price per Night: Nok {price} </Card.Text>
              <Card.Text>Max Guests: {maxGuests}</Card.Text>
              <Card.Text>{parkingIncluded}</Card.Text>
              <Card.Text>{wifiIncluded}</Card.Text>
              <Card.Text>{breakfastIncluded}</Card.Text>
            </Card.Body>
            <BookDateByCalendar maxGuests={maxGuests} price={price}/>
          </Card>
          
        </Col>
      </Row>
      <Row>
        <Col>
          {isOwner && bookings && bookings.length > 0 ? ( // Conditionally render booking information for the owner
<Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Bookings Information
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <ListGroup>
          <ListGroup.Item>
            <div>
              <ul>
                {bookings.map((booking, index) => (
                  <li key={index}>
                    From: {new Date(booking.dateFrom).toLocaleDateString()} -
                    To: {new Date(booking.dateTo).toLocaleDateString()} |
                    Guests: {booking.guests}
                  </li>
                ))}
              </ul>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Dropdown.Menu>
    </Dropdown>
          ) : null}
        </Col>

      </Row>
    </Container>
  );
}


