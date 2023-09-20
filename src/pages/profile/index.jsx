import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Modal, Form } from 'react-bootstrap';
import { FetchUserProfile } from '../../posts/getProfile';
import { EditAvatar} from '../../posts/editAvatar';
import { load, save } from '../../components/localStorage';

// // Custom function to set data in local storage
// function setItem(key, value) {
//   localStorage.setItem(key, JSON.stringify(value));
// }

export default function UserProfileListener() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    avatar: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');

  // fetching data from the API
  useEffect(() => {
    // Fetch user profile data from the API when the component mounts
    const fetchUserProfile = async () => {
      try {
        const token = load('token');
        const userName = load('user');
        console.log(userName);
        const response = await FetchUserProfile(userName, token);

        if (response) {
          setUser(response);
        } else {
          // Handle error
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

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Function to handle file input change
   const handleAvatarUrlChange = (event) => {
    // Update the avatar URL when the user inputs a new value
    setAvatarUrl(event.target.value);
  };

  // Function to handle avatar upload
   const handleAvatarUpload = async () => {
    if (!avatarUrl || !isValidUrl(avatarUrl)) {
      // Ensure a valid image URL is provided
      console.error('Please enter a valid image URL.');
      return;
    }

    // Simulate updating the avatar (Replace this with your actual API call)
    try {
      // Assuming EditAvatar is an async function that updates the user's avatar
      const token = load('token')
      const success = await EditAvatar (avatarUrl, token);

      if (success) {
        // Update the user's avatar and close the modal
        setUser((prevUser) => ({
          ...prevUser,
          avatar: avatarUrl, // Display the uploaded avatar URL
        }));
        setShowModal(false);

        // Store the updated user data in local storage (Replace 'userData' with your key)
        const updatedUserData = {
          ...user,
          avatar: avatarUrl,
        };
        save('user', updatedUserData);
      } else {
        console.error('Error updating avatar');
      }
    } catch (error) {
      console.error('Error updating avatar', error);
    }
  };

  const isValidUrl = (url) => {
    // Use a simple URL validation regex here
    const urlPattern = /^(http(s)?:\/\/)?\S+\.\S+/;
    return urlPattern.test(url);
  };

  // Replace this function with your actual UpdateAvatar function
  const UpdateAvatar = async (avatarUrl) => {
    // Simulate an asynchronous API call to update the avatar
    return new Promise((resolve) => {
      setTimeout(() => {
        // Resolve with true to indicate a successful update
        resolve(true);
      }, 2000); // Simulate a 2-second delay (replace with your actual API call)
    });
  };

  return (
    <Container>
      <Row>
        {/* Left Side: User Information */}
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src={user.avatar} />
            <Card.Body>
              <Card.Title>{user.name}</Card.Title>
              <Card.Text>email : {user.email}</Card.Text>
            </Card.Body>
          </Card>
          <Button variant="primary" onClick={handleUpdateAvatar}>
                Update Avatar
          </Button>
              <Button href='/profile/create' variant="primary">
                Create Venue
              </Button>
        </Col>

        {/* Right Side: Content */}
        <Col md={8}>
          {/* Content for the selected button */}
        </Col>
      </Row>
      {/* Modal for Updating Avatar */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Avatar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formAvatarUrl">
            <Form.Label>Enter a new avatar image URL:</Form.Label>
            <Form.Control
              type="url"
              placeholder="https://example.com/avatar.jpg"
              value={avatarUrl}
              onChange={handleAvatarUrlChange}
            />

          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAvatarUpload}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

