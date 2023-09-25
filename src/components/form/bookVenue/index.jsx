import { useState } from "react";
import { Card, Col, Row, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import { useParams } from "react-router-dom";
import { CreateBooking } from "../../../posts/create/createBooking";



export default function BookDateByCalendar ({maxGuests, price}) {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState(1);  
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalGuests, setTotalGuests] = useState(0);
  const [error, setError] = useState(null);
  const {id} = useParams();

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



    const calculateTotalAmount = () => {
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
    };


    const reserveVenue = async () => {
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
            venueId: id, // Use the venueId from route params
        };

        // Call the API to create the booking
        const bookingResult = await CreateBooking (bookingData);

        if (bookingResult) {
        // Save the booking data to localStorage if needed
        // Example: localStorage.setItem('bookingData', JSON.stringify(bookingData));

            // Display a success message or perform any other actions
            alert("Reservation successful!");
        } else {
            setError("Reservation failed. Please try again later.");
        }
    };


  return (
    <Row>
        <Col>
            <Card>
                <Card.Body>
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
                    <Form.Group>
                        <Form.Label>Number of Guests</Form.Label>
                        <Form.Control
                            type="number"
                            value={guests}
                            onChange={handleGuestsChange}
                            min={1} // Minimum value allowed
                            max={maxGuests} // Maximum value allowed
                        />
                        {error && <div className="text-danger">{error}</div>}
                    </Form.Group>
                    <Button variant="primary" onClick={calculateTotalAmount}>
                        Calculate Total
                    </Button>
                    {totalAmount > 0 && (
                    <div>
                        <div>Total Amount: Nok {totalAmount}</div>
                        <div>Total number of Guests: {totalGuests}</div>
                    </div>   
                    )}
                    <Button variant="primary" onClick={reserveVenue}>
                        Reserve
                    </Button>
                    {error && <div className="text-danger">{error}</div>}
                </Card.Body>
            </Card>
        </Col>
    </Row>
  )

}