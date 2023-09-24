import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Tabs, Tab, Image } from 'react-bootstrap';
import { FetchUserProfile } from '../../posts/getProfile';
import AvatarUpdate from '../../components/form/avatar';
import BookingsDisplay from '../../components/form/createdBookings'
import { load } from '../../components/localStorage';
import VenuesDisplay from '../../components/form/createdVenues';

export default function UserProfileListener() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    avatar: '',
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = load('token');
        const userName = load('user');
        const response = await FetchUserProfile(userName, token);

        if (response) {
          setUser(response);
          // console.log(user);
        } else {
          console.error('Error fetching user profile');
        }
      } catch (error) {
        console.error('Error fetching user profile', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateAvatar = () => {
    setShowModal(true);
  };

  return (
    <Container className="justify-content-md-center">
      <Row className="justify-content-md-center" md={5}>
        <Image src={user.avatar} roundedCircle />
      </Row>
      <Row className="justify-content-md-center">
        <Col md={5}>
          <Card>
            <Card.Body>
              <Card.Title>{user.name}</Card.Title>
              <Card.Text>email : {user.email}</Card.Text>
              <Row>
                <Col>
                  <Button variant="primary" onClick={handleUpdateAvatar}>
                    Update Avatar
                  </Button>
                </Col>
                <Col>
                  <Button href="/profile/create" variant="primary">
                    Create Venue
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-md-center" mb={2}>
        <Col md={10}>
          <Tabs
            defaultActiveKey="Venue"
            id="justify-tab-example"
            className="mb-3"
            justify
          >
            <Tab eventKey="Venue" title="My Venue">
              < VenuesDisplay />
            </Tab>
            <Tab eventKey="Booking" title="My Bookings">
              < BookingsDisplay />
            </Tab>
          </Tabs>
        </Col>
      </Row>
      <AvatarUpdate
        user={user}
        setUser={setUser}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </Container>
  );
}



