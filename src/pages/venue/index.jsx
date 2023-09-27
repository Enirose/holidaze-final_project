import React from "react";
import useApi from "../../components/hooks/useApi";
import { venuesUrl } from "../../components/constants/constantsUrl";
import { Card, Container, Row, Col, Carousel, Dropdown, ListGroup, Tabs, Tab } from "react-bootstrap";
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
  const locationAddress = location && location.address ? location.address : '';

  // Check if meta object exists and extract properties
  const parkingIncluded = meta && meta.parking ? "Parking: Yes" : "Parking: No";
  const wifiIncluded = meta && meta.wifi ? "Wifi: Yes" : "Wifi: No";
  const breakfastIncluded = meta && meta.breakfast
    ? "Breakfast: Yes"
    : "Breakfast: No";


  const isOwner = currentUser && currentUser.name === ownerName;
  const emptyImageUrl = 'https://media.istockphoto.com/id/1128826884/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment.jpg?s=170667a&w=0&k=20&c=O9Y41QO7idN44o-VK5s7dBUqg-dhJZcyagMb8485BNU='

  return (
    <Container className="mb-4">
      <Row>
        <Col>
          <Card key={id} className="m-4">
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
            ) : media && media.length === 1 ? (
              <Card.Img
                variant="top"
                src={media[0]}
                alt={name}
                className="mb-4 d-block h-10"
              />
            ) : (
              // Add a placeholder or message when media is empty
              <Card.Img
                variant="top"
                src={emptyImageUrl}
                alt={name}
                className="mb-4 d-block h-10"
              />
              
            )}
          </Card>
        </Col>
      </Row>
      <Row>
          <Tabs
            defaultActiveKey="description"
            id="justify-tab-example"
            className="mb-3"
            justify
          >
            <Tab eventKey="description" title="Description">
              <h1>{name}</h1>
              <div>{description}</div>
            </Tab>
            <Tab eventKey="information" title="Information">
              <h5>Location: {locationCity},  {locationCountry}</h5>
              <div>Address: {locationAddress}</div>
              <div>Price per Night: Nok {price} </div>
              <div>Max Guests: {maxGuests}</div>
              <div>{parkingIncluded}</div>
              <div>{wifiIncluded}</div>
              <div>{breakfastIncluded}</div>
            </Tab>
            
          </Tabs>
        </Row>
      <Row m={4}>
          <BookDateByCalendar maxGuests={maxGuests} price={price}/>
        </Row>
      <Row>
        <Col>
          {isOwner ? (
            bookings && bookings.length > 0 ? (
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
            ) : (
              <div>No bookings available</div>
            )
          ) : null}
        </Col>
      </Row>
    </Container>
  );
}


