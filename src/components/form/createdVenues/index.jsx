import React from "react";
import { Card, Container, ListGroup, Image } from "react-bootstrap";
import { profileUrl } from "../../constants/constantsUrl";
import useApi from "../../hooks/useApi";
import { load } from "../../localStorage";

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
    
    // Function to format a date in a user-friendly format
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <Container>
            <h2>Your Venues</h2>
            {venues.length > 0 ? (
                <ListGroup>
                    {venues.map((venue) => (
                        <ListGroup.Item key = {venue.id}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Venue ID: {venue.name}</Card.Title>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                        {venue.media && venue.media.length > 0 ? ( //Display the media and if it's an array, just display 1
                                            <Image src={venue.media[0]} alt={`Your next distination: ${venue.id}`} style={{ maxWidth: '50%', maxHeight: '100%' }} />
                                            ) : (
                                            <Image src="" alt="Placeholder Image" />
                                        )}
                                    </div>
                                    <Card.Text>
                                        From: {formatDate(venue.dateFrom)}
                                    </Card.Text>
                                    <Card.Text>
                                        To: {formatDate(venue.dateTo)}
                                    </Card.Text>
                                    <Card.Text>
                                        Guests: {venue.guests}
                                    </Card.Text>
                                    <Card.Text>
                                        Created: {formatDate(venue.created)}
                                    </Card.Text>
                                    <Card.Text>
                                        Updated:{formatDate(venue.updated)}
                                    </Card.Text>
                                </Card.Body>
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