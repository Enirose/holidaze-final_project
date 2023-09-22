// AvatarUpdate.js
import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { load, save } from '../../localStorage';
import { EditAvatar } from '../../../posts/editAvatar';

export default function AvatarUpdate({ user, setUser, showModal, setShowModal }) {
  const [avatarUrl, setAvatarUrl] = useState('');

  const handleAvatarUrlChange = (event) => {
    setAvatarUrl(event.target.value);
  };

  const handleAvatarUpload = async () => {
    if (!avatarUrl || !isValidUrl(avatarUrl)) {
      console.error('Please enter a valid image URL.');
      return;
    }

    try {
      const token = load('token');
      const success = await EditAvatar (avatarUrl, token);

      if (success) {
        setUser((prevUser) => ({
          ...prevUser,
          avatar: avatarUrl,
        }));
        setShowModal(false);

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
    const urlPattern = /^(http(s)?:\/\/)?\S+\.\S+/;
    return urlPattern.test(url);
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
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
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAvatarUpload}>
          Upload
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
