import { useEffect, useState } from "react";
import { Card, Col, Row, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import { useNavigate, useParams } from "react-router-dom";
import { CreateBooking } from "../../../posts/create/createBooking";
import { load } from "../../localStorage";

export default function BookDateByCalendar ({maxGuests, price}) {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState(1);  
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalGuests, setTotalGuests] = useState(0);
  const [error, setError] = useState(null);
  const {id} = useParams();
  const navigate = useNavigate();

  const handleCheckInChange = (date) => {
    setCheckInDate(date);
  };

  const handleCheckOutChange = (date) => {
    setCheckOutDate(date);
  };



  const handleGuestsChange = (e) => {
    const newGuests = parseInt(e.target.value) || '';

    // Ensure that the new number of guests does not exceed maxGuests
    if (newGuests <= maxGuests) {
      setGuests(newGuests);
      // Clear any previous error message
      setError(null);
    } else {
      // If it exceeds, set guests to maxGuests
      setGuests(maxGuests);
      // Display an error message
      setError("Number of guests cannot exceed the maximum allowed.");
    }
  };


    useEffect(() => {
    // Calculate total amount whenever check-in, check-out dates, or guests change
    if (checkInDate && checkOutDate) {
      // Validate that check-out date is after check-in date
      if (checkOutDate > checkInDate) {
        // Calculate the number of days between check-in and check-out dates
        const timeDifference = checkOutDate - checkInDate;
        const numberOfDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

        // Calculate the total amount based on the price per night
        const totalPrice = numberOfDays * price * guests;
        setTotalAmount(totalPrice);

        // Update total guests
        setTotalGuests(guests);
      } else {
        setError("Check-out date must be after check-in date.");
      }
    }
  }, [checkInDate, checkOutDate, guests, price])

  const isLoggedIn = load('token')


  const reserveVenue = async () => {

    if(!isLoggedIn) {
      navigate('/login');
      return;
    }

        // Check if all required fields are filled
    if (!checkInDate || !checkOutDate || guests < 1) {
      setError("Please fill in all required fields.");
      return;
    }

        // Create the booking object
    const bookingData = {
        dateFrom: checkInDate.toISOString(),
        dateTo: checkOutDate.toISOString(),
        guests,
        venueId: id, 
    };

        // Call the API to create the booking
    const bookingResult = await CreateBooking (bookingData);

    if (bookingResult) {
        alert("Reservation successful!");
        navigate('/profile')
    } else {
        setError("Reservation failed. Please try again later.");
    }
  };


  return (
    <Row>
        <Col>
            <Card className="date-range-card">
                <Card.Body>
                    <div>
                        <h4>Select Check-In and Check-Out Dates:</h4>
                        <div className="date-picker">
                            <div className="date-picker-input">
                                <label>Check-In Date:</label>
                                <DatePicker
                                    selected={checkInDate}
                                    onChange={handleCheckInChange}
                                    minDate={new Date()}
                                    showDisabledMonthNavigation
                                    className="m-1"
                                />
                            </div>
                            <div className="date-picker-input">
                                <label>Check-Out Date:</label>
                                <DatePicker
                                    selected={checkOutDate}
                                    onChange={handleCheckOutChange}
                                    minDate={checkInDate || new Date()}
                                    showDisabledMonthNavigation
                                    className="m-1"
                                />
                            </div>
                        </div>
                        {checkInDate && checkOutDate && (
                            <p>
                            You selected Check-In: {checkInDate.toDateString()}, Check-Out: {checkOutDate.toDateString()}
                            </p>
                        )}
                    </div>
                    <Form.Group>
                        <Form.Label>Number of Guests</Form.Label>
                        <Form.Control
                            type="number"
                            value={guests}
                            onChange={handleGuestsChange}
                            min={1}
                            max={maxGuests}
                            className="shortInput"
                        />
                        {error && <div className="text-danger">{error}</div>}
                    </Form.Group>
                    {/* <Button variant="primary" onClick={calculateTotalAmount}>
                        Calculate Total
                    </Button> */}
                    <Button className="mt-3" variant="primary" onClick={reserveVenue}>
                        Reserve
                    </Button>
                    {totalAmount > 0 && (
                    <div>
                        <div>Total Amount: Nok {totalAmount}</div>
                        <div>Total number of Guests: {totalGuests}</div>
                    </div>   
                    )}
                </Card.Body>
            </Card>
        </Col>
    </Row>
  )

}