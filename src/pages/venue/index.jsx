import React from "react";
import useApi from "../../components/hooks/useApi";
import { venuesUrl } from "../../components/constants/constantsUrl";
import { Card, Container, Row, Col, Carousel, Dropdown, ListGroup, Tabs, Tab, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import BookDateByCalendar from "../../components/form/bookVenue";
import { load } from "../../components/localStorage";
import {FaCar, FaDog, FaUtensils, FaWifi} from 'react-icons/fa'
import {BsPeopleFill} from 'react-icons/bs'

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
    bookings,
  } = data;

  // Check if owner exists and contains a name property
  const ownerName = owner && owner.name ? owner.name : 'Owner information not available';
  const ownerAvatar = owner && owner.avatar ? owner.avatar:'';

  // Check if location exists and contains the country and city property
  const locationCountry = location && location.country ? location.country : '';
  const locationCity = location && location.city ? location.city : '';
  const locationAddress = location && location.address ? location.address : '';

  // Check if meta object exists and extract properties
  const parkingIncluded = meta && meta.parking ? (<p><FaCar /> Parking</p>) : (<p className="text-decoration-line-through"><FaCar /> Parking </p>);
  const breakfastIncluded =meta && meta.pets ?  (<p> <FaUtensils/> Breakfast</p>) : (<p className="text-decoration-line-through"> <FaUtensils /> Breakfast </p>);
  const wifiIncluded =meta && meta.wifi ?  (<p> <FaWifi/> Wifi </p>) : (<p className="text-decoration-line-through"> <FaWifi /> Wifi </p>);
  const petsIncluded =meta && meta.pets ?  (<p> <FaDog/> Pets</p>) : (<p className="text-decoration-line-through"> <FaDog /> Pets </p>);

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
                      className="d-block w-100 h-100"
                      src={image}
                      alt={name}
                      style={{ objectFit: 'cover' }} 
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
              <Card.Img // placeholder or message when media is empty
                variant="top"
                src={emptyImageUrl}
                alt={name}
                className="mb-4 d-block h-10"
              />
            )}
            <div className="m-3">
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
                <div className="d-flex justify-content-between">
                  {parkingIncluded}
                  {wifiIncluded}
                  {petsIncluded}
                  {breakfastIncluded}
                </div>
                <h3>Location: {locationCity},  {locationCountry}</h3>
                <h5>Address: {locationAddress}</h5>
                <div>
                  <h5>Manager: {ownerName}</h5>
                  <Image
                    src={ownerAvatar}
                    roundedCircle
                    width={30}
                    height={30}
                    alt="Owner Image"
                  />
                </div>
                <h5>Price per Night: Nok {price} </h5>
                <div> <BsPeopleFill/> {maxGuests}</div>
                
              </Tab>
            </Tabs>
            </div>
          </Card>
        </Col>
        <Col lg={5} className="mt-4">
          <BookDateByCalendar maxGuests={maxGuests} price={price}/>
            <div>
                {isOwner ? ( bookings && bookings.length > 0 ? (
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
            </div>
        </Col>
      </Row>
    </Container>
  );
}

