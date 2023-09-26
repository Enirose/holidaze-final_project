import React, { useEffect, useState } from "react";
import { Card, Container, ListGroup, Image, Button } from "react-bootstrap";
import { profileUrl } from "../../constants/constantsUrl";
import useApi from "../../hooks/useApi";
import { load } from "../../localStorage";
import { Link } from "react-router-dom";
import formatDate from "../../formatDate";
import VenueWithBookingInfo from "../venueBookingsInfo";

export default function VenuesDisplay () {
    const userData = load('user');
    const {name} = userData;
    const userVenuesUrl = `${name}?_venues=true&_owner=true&_media`;

    const {data, isLoading, isError} = useApi (`${profileUrl}${userVenuesUrl}`);


    if (isLoading) {
        return <div>
            Loading....
        </div>
    } 

    if (isError) {
        return <div>
            Something went wrong!
        </div>
    }

    const venues = data?.venues || [];

    return (
        <Container>
            <h2>Your Venues</h2>
            {venues.length > 0 ? (
                <ListGroup>
                    {venues.map((venue) => (
                        <ListGroup.Item key = {venue.id}>
                            <Link to={`/venue/${venue.id}`}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{venue.name}</Card.Title>
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                            {venue.media && venue.media.length > 0 ? ( //Display the media and if it's an array, just display 1
                                                <Image src={venue.media[0]} alt={`Your next distination: ${venue.id}`} style={{ maxWidth: '50%', maxHeight: '100%' }} />
                                                ) : (
                                                <Image src="" alt="Placeholder Image" />
                                            )}
                                        </div>
                    
                                        <Card.Text>
                                            Guests: {venue.maxGuests}
                                        </Card.Text>
                                        <Card.Text>
                                            Created: {formatDate(venue.created)}
                                        </Card.Text>
                                        <Card.Text>
                                            Updated:{formatDate(venue.updated)}
                                        </Card.Text>
                                        {/* {venueBookings[venue.id] && Array.isArray(venueBookings[venue.id]) && (
                                            <div>
                                                <h4>Bookings:</h4>
                                                <ul>
                                                {venueBookings[venue.id].map((booking) => (
                                                    <li key={booking.id}>
                                                    Date: {formatDate(booking.date)}, Guests: {booking.maxGuests}, Customer: {booking.customer}
                                                    </li>
                                                ))}
                                                </ul>
                                            </div>
                                        )} */}
                                        <VenueWithBookingInfo venueId={venue.id} />
                                    </Card.Body>
                                </Card>
                            </Link>
                            <Button href={`/profile/edit/${venue.id}`} >Update Venue</Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            ) : (
                <div>No venues found. </div>
            )}
        </Container>
    );
}