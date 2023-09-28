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
      <Row className="justify-content-center" mt={4}>
        <Image src={user.avatar} roundedCircle className='avatar' alt="User Profile {user.name}"/>
      </Row>
      <Row  className='d-flex justify-content-center'>
        <Col md={5}>
          <Card>
            <Card.Body>
              <div className="text-center">
                <Card.Title>{user.name}</Card.Title>
                <Card.Text>Email: {user.email}</Card.Text>
              </div>
              <Row>
                 <div className='d-flex justify-content-center mt-3'>
                  <Col className='d-flex justify-content-center'>
                    <Button variant="primary" onClick={handleUpdateAvatar}>
                      Update Avatar
                    </Button>
                  </Col>
                  <Col className='d-flex justify-content-center'>
                    <Button href="/profile/create" variant="primary">
                      Create Venue
                    </Button>
                  </Col>
                </div>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-3 mb-5">
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



