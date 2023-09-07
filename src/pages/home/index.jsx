import React, { useState } from "react";
import useApi from "../../components/hooks/useApi";
import { venuesUrl } from "../../components/constants/constantsUrl";
import { Form, Col, Row, Button, Card, Container } from "react-bootstrap";
import vite from '../../../public/vite.svg'
import { Link } from "react-router-dom";


export default function HomePage () {
    const {data, isLoading, isError} =  useApi (venuesUrl);
    const [search, setSearch] = useState('');
    const venues = data;
    const ifNoImage = (e) => { e.target.src = vite.src}

    if (isLoading) {
        return <div>loader</div>;
    }
    
    if (isError) {
        return<div>Something went wrong!</div>
    }

    return (
        <Container>
            <Row>
                <Col xs="auto">
                    <Form.Control
                    type="text"
                    placeholder="Search.."
                    className=" mr-sm-2"
                    onChange={event => setSearch(event.target.value)}
                    />
                </Col>
            </Row>
            
    
            <Row className="row-cols-1 row-cols-md-3  g-4">
                <Col md={4}>
                    {venues.filter(venue => {
                        if (search === '') {
                            return venue;
                        } else if (venue.name.toLowerCase().includes(search.toLowerCase()) || 
                                venue.location.city.toLowerCase().includes(search.toLowerCase()) ||
                                venue.location.country.toLowerCase().includes(search.toLowerCase())) {
                            return venue;
                        }         
                    }).map((venue) => (
                            <Card key={venue.id}  className="mb-4">
                                <Card.Img variant="top" onError={ifNoImage} src={venue.media[0]} alt={venue.name} className="mb-4 d-block h-10 "/>
                                <Card.Body>
                                    <Card.Title>{venue.name}</Card.Title>
                                    <Card.Text>{venue.location.country}
                                    </Card.Text>
                                    <Link to={`/venue/${venue.id}`}><Button variant="primary">Go somewhere</Button></Link>
                                </Card.Body>
                            </Card>
                    ))}                        
                </Col>
            </Row>                
        </Container>
    )
}