import React, { useEffect, useState } from "react";
import { Card, Container, ListGroup, Image, Button, Row, Col } from "react-bootstrap";
import { profileUrl } from "../../constants/constantsUrl";
import useApi from "../../hooks/useApi";
import { load } from "../../localStorage";
import { Link } from "react-router-dom";
import formatDate from "../../formatDate";
import VenueWithBookingInfo from "../venueBookingsInfo";
import { DeleteVenue } from "../../../posts/deleteVenue";

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

    // Function to handle deleting a venue
    const handleDeleteVenue = async (venueId) => {
        if (window.confirm("Are you sure you want to delete this venue?")) {

        try {
            const response = await DeleteVenue(venueId);

            if (response.ok) {
                location.reload();
            } else {
            console.error('Failed to delete the venue');
            }
        } catch (error) {
            console.error('Error deleting the venue', error);
        }
        }
    };

    const venues = data?.venues || [];

    return (
        <Container>
            <h2>Your Venues</h2>
            {venues.length > 0 ? (
                <ListGroup>
                    {venues.map((venue) => (
                        <ListGroup.Item key={venue.id}>
                            <Card>
                                <Row>
                                    <Col md={4}>
                                    <Link to={`/venue/${venue.id}`}>
                                        {venue.media && venue.media.length > 0 ? (
                                        <Image
                                            src={venue.media[0]}
                                            alt={`Your next destination: ${venue.id}`}
                                            style={{ maxWidth: '100%', maxHeight: '100%' }}
                                        />
                                        ) : (
                                        <Image src="" alt="Placeholder Image" />
                                        )}
                                    </Link>
                                    </Col>
                                    <Col md={4}>
                                        <Card.Body>
                                            <Card.Title>{venue.name}</Card.Title>
                                            <Card.Text>
                                            Guests: {venue.maxGuests}
                                            </Card.Text>
                                            <Card.Text>
                                            Created: {formatDate(venue.created)}
                                            </Card.Text>
                                            <Card.Text>
                                            Updated: {formatDate(venue.updated)}
                                            </Card.Text>
                                        </Card.Body>
                                    </Col>
                                    <Col md={4}>
                                        <Card.Body className="" >                                         
                                            <Button href={`/profile/edit/${venue.id}`} >Update Venue</Button>
                                            <Button variant="danger" onClick={() => handleDeleteVenue(venue.id)}>Delete Venue</Button>
                                            <VenueWithBookingInfo venueId={venue.id} />
                                        </Card.Body>
                                    </Col>
                                </Row>
                            </Card>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            ) : (
                <div>No venues found. </div>
            )}
        </Container>
    );
}