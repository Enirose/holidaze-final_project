import React, { useState } from "react";
import useApi from "../../components/hooks/useApi";
import { venuesUrl } from "../../components/constants/constantsUrl";
import { Form, Col, Row, Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const emptyImageUrl = 'https://media.istockphoto.com/id/1128826884/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment.jpg?s=170667a&w=0&k=20&c=O9Y41QO7idN44o-VK5s7dBUqg-dhJZcyagMb8485BNU='

export default function HomePage () {
    const {data, isLoading, isError} =  useApi (venuesUrl + '?sort=created');
    const [search, setSearch] = useState('');
    const venues = data;

    if (isLoading) {
        return <div>loader</div>;
    }

    if (isError) {
        return<div>Something went wrong!</div>
    }

    return (
        <Container>
            
            <Row className="justify-content-center mb-4 mt-4">
                <Col xs="auto">
                    <Form.Control
                    type="text"
                    placeholder="Search.."
                    className="mr-sm-2"
                    onChange={event => setSearch(event.target.value)}
                    />
                </Col>
            </Row>

            <Row className="row-cols-1 row-cols-md-3 g-4">
                {venues
                .filter((venue) => {
                    if (search === '') {
                    return venue;
                    } else if (
                    venue.name.toLowerCase().includes(search.toLowerCase()) ||
                    venue.location.city.toLowerCase().includes(search.toLowerCase()) ||
                    venue.location.country.toLowerCase().includes(search.toLowerCase())
                    ) {
                    return venue;
                    }
                })
                .map((venue) => (
                    <Col key={venue.id} md={3} className="mb-4">
                    <Card className="h-100">
                        <Card.Img variant="top" src={venue.media.length > 0 ? venue.media[0] : emptyImageUrl } alt={venue.name} className="mb-4 d-block" />
                        <Card.Body>
                        <Card.Title>{venue.name}</Card.Title>
                        <Card.Text>{venue.location.country}</Card.Text>
                        <Card.Text>{venue.price} kr/night</Card.Text>
                        <Link to={`/venue/${venue.id}`}>
                            <Button variant="primary">Check availability</Button>
                        </Link>
                        </Card.Body>
                    </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}