import React, { useState } from "react";
import useApi from "../../components/hooks/useApi";
import { venuesUrl } from "../../components/constants/constantsUrl";
import { Form, Col, Row, Button, Card, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../../components/loader";
import { IoLocationSharp} from "react-icons/io5";

const emptyImageUrl = 'https://media.istockphoto.com/id/1128826884/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment.jpg?s=170667a&w=0&k=20&c=O9Y41QO7idN44o-VK5s7dBUqg-dhJZcyagMb8485BNU='

export default function HomePage () {
    const {data, isLoading, isError} =  useApi (venuesUrl + '?sort=created&_owner=true');
    const [search, setSearch] = useState('');
    const venues = data;

    const defaultOwnerAvatar = 'https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg';

    if (isLoading) {
        return <Loader/>;
    }

    if (isError) {
        return<div>Something went wrong!</div>
    }

    return (
        <Container>
            <Row className="justify-content-center mb-4 mt-4">
                <Col>
                    <Form.Control
                    type="text"
                    placeholder="Search your next holidaze venue....."
                    className="mr-sm-2"
                    onChange={event => setSearch(event.target.value)}
                    />
                </Col>
            </Row>

            <Row className="row-cols-1 row-cols-md-3 g-5">
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
                    <Col key={venue.id} md={4} >
                        <Link to={`/venue/${venue.id}`} className="text-decoration-none">
                            <Card className="h-100">
                                <Card.Img variant="top" src={venue.media.length > 0 ? venue.media[0] : emptyImageUrl } alt={venue.name} className="mb-4 d-block" />
                                <Card.Body>
                                    <h1>{venue.name}</h1>
                                    <Card.Text><IoLocationSharp/> {venue.location && venue.location.country ? venue.location.country : 'Undefined'}</Card.Text>
                                    <div className="d-flex justify-content-between">
                                        <p>Manager: {venue.owner.name}</p>
                                        <Image
                                        src={venue.owner.avatar || defaultOwnerAvatar}
                                        roundedCircle
                                        width={30}
                                        height={30}
                                        alt="User Image"
                                        />
                                    </div>
                                    <Card.Text>{venue.price} kr/night</Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}