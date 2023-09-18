import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { RegisterUser } from '../../../posts/auth/register';
import { useNavigate } from 'react-router-dom';

const emailRegex = /^[\w\-.]+@stud.noroff.no$/;

const Schema = yup.object({
  name: yup
    .string()
    .trim()
    .min(3, 'Must be at least 3 characters long')
    .max(30, 'Your name must be 30 characters or less')
    .matches(/^[a-zA-Z_]*$/, 'Valid characters: a-z, A-Z, and underscore.')
    .required('Enter your name'),
  email: yup.string().matches(emailRegex, 'Enter a valid email address').required(),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password must be 20 characters or less')
    .required('Enter a password'),
  avatar: yup.string().url().required('Please use a valid image URL'),
  venueManager: yup.boolean().required('Select whether you are a venue manager'),
});

export default function RegisterListener() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(Schema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    const venueManager = data.venueManager || false; // Set to false if checkbox is not checked
     console.log('Data being sent to the server:', data);// RegisterUser(data)
    try {
      const result = await RegisterUser({...data, venueManager });
      console.log('Response from server:', result);
      setIsLoading(false);

      if (result.success) {
        // Registration successful, you can handle this as needed
        // For example, show a success message or redirect the user
        navigate('/login');
      } else {
        setIsLoading(false);
        setIsError(true);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h2>Registration</h2>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="formBasicFullName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your full name"
                    {...register('name')}
                  />
                  <Form.Text className="text-danger">
                    {errors.fullName?.message}
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    {...register('email')}
                  />
                  <Form.Text className="text-danger">
                    {errors.email?.message}
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    {...register('password')}
                  />
                  <Form.Text className="text-danger">
                    {errors.password?.message}
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicAvatar">
                  <Form.Label>Avatar URL</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="Enter avatar URL"
                    {...register('avatar')}
                  />
                  <Form.Text className="text-danger">
                    {errors.avatar?.message}
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicVenueManager">
                    <Form.Check
                        type="checkbox"
                        label="I am a venue manager"
                        {...register('venueManager')}
                    />
                    <Form.Text className="text-danger">
                        {errors.venueManager?.message}
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit" disabled={isLoading}>
                  {isLoading ? 'Registering...' : 'Register'}
                </Button>
                {isError && (
                  <div className="mt-2 text-danger">
                    Registration failed. Please try again later.
                  </div>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}