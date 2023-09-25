import React, { useState } from "react";
import useApi from "../../components/hooks/useApi";
import { venuesUrl } from "../../components/constants/constantsUrl";
import { Card, Container, Row, Col, Carousel, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

export default function SpecificVenue() {
  const { id } = useParams();
  const ownerUrl = "?_bookings=true&owner=true";
  const { data, isLoading, isError } = useApi(`${venuesUrl}/${id}${ownerUrl}`);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
   const [totalAmount, setTotalAmount] = useState(0);

//   const [index, setIndex] = useState(0);
//   const handleSelect = (selectedIndex) =>{
//     setIndex(selectedIndex)
//   }

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
    // Add other properties you want to display here
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

  
  const handleCheckInChange = (date) => {
    setCheckInDate(date);
  };

  const handleCheckOutChange = (date) => {
    setCheckOutDate(date);
  };

  const calculateTotalAmount = () => {
    if (checkInDate && checkOutDate) {
      // Calculate the number of days between check-in and check-out dates
      const timeDifference = checkOutDate - checkInDate;
      const numberOfDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

      // Calculate the total amount based on the price per night
      const totalPrice = numberOfDays * price;
      setTotalAmount(totalPrice);
    }
  };


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
              {/* Add other property displays here */}
            </Card.Body>
            <div>
              <h2>Select Check-In and Check-Out Dates:</h2>
              <div className="date-picker">
                <div className="date-picker-input">
                  <label>Check-In Date:</label>
                  <DatePicker
                    selected={checkInDate}
                    onChange={handleCheckInChange}
                    minDate={new Date()}
                    showDisabledMonthNavigation
                  />
                </div>
                <div className="date-picker-input">
                  <label>Check-Out Date:</label>
                  <DatePicker
                    selected={checkOutDate}
                    onChange={handleCheckOutChange}
                    minDate={checkInDate || new Date()}
                    showDisabledMonthNavigation
                  />
                </div>
              </div>
              {checkInDate && checkOutDate && (
                <p>
                  You selected Check-In: {checkInDate.toDateString()}, Check-Out: {checkOutDate.toDateString()}
                </p>
              )}
            </div>
          <Button variant="primary" onClick={calculateTotalAmount}>
            Calculate Total
          </Button>
          {totalAmount > 0 && (
            <div>Total Amount: Nok {totalAmount}</div>
          )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}


