import React from "react";
import { Card, Container, ListGroup, Image, Button, Row, Col } from "react-bootstrap";
import { profileUrl } from "../../constants/constantsUrl";
import useApi from "../../hooks/useApi";
import { load } from "../../localStorage";
import { Link } from "react-router-dom";
import formatDate from "../../formatDate";
import VenueWithBookingInfo from "../venueBookingsInfo";
import { DeleteVenue } from "../../../posts/deleteVenue";
import Loader from "../../loader";

export default function VenuesDisplay () {
    const userData = load('user');
    const {name} = userData;
    const userVenuesUrl = `${name}?_venues=true&_owner=true&_media`;
    const {data, isLoading, isError} = useApi (`${profileUrl}${userVenuesUrl}`);

    if (isLoading) {
        return <Loader/>
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
                <div>
                    {venues.map((venue) => (
                        <ListGroup.Item key={venue.id}>
                            <Card>
                                <Row>
                                    <Col md={4} className="d-flex justify-content-center align-items-center">
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
                                    <Col md={5}>
                                        <Card.Body>
                                            <h1>{venue.name}</h1>
                                            <Card.Text>
                                            Guests allowed: {venue.maxGuests} pax
                                            </Card.Text>
                                            <Card.Text>
                                            Created: {formatDate(venue.created)}
                                            </Card.Text>
                                            <Card.Text>
                                            Updated: {formatDate(venue.updated)}
                                            </Card.Text>
                                            <VenueWithBookingInfo venueId={venue.id} />
                                        </Card.Body>
                                    </Col>
                                    <Col md={3}>
                                        <Card.Body>                                         
                                            <Button className="mb-2 " href={`/profile/edit/${venue.id}`} >Update Venue</Button>
                                            <Button className="mb-2" variant="danger" onClick={() => handleDeleteVenue(venue.id)}>Delete Venue</Button>    
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