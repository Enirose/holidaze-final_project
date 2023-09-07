import React from "react";
import useApi from "../../components/hooks/useApi";
import { venuesUrl } from "../../components/constants/constantsUrl";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";


export default function SpecificVenue()  {
    const {id} = useParams();
    const [data, isLoading, isError] = useApi(`${venuesUrl}/${id}`) 
    

    if (isLoading) {
        return <div>Loader...</div>
    }

    if (isError) {
        return <div> something went wrong!</div>
    }

    const {
        name,
        media,
        description,
        price,
        maxGuests,
        rating,
        meta,
        location,
        owner,
        bookings,
    } = data;


    return (
        <>
            <Container  className="mb-4">
                <Row>
                    <Col>
                        <Card key={id}  className="mb-4">
                            <Card.Img variant="top" src={media[0]} alt={name} className="mb-4 d-block h-10 "/>
                                <Card.Body>
                                    <Card.Title>{name}</Card.Title>
                                    <Card.Text>{description}</Card.Text>
                                    <Card.Text>{location.country}</Card.Text>
                                    <Card.Text>{location.country}</Card.Text>
                                    
                                    
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        
        </>
    )


}