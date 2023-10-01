import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const emailRegex = /^[\w\-.]+@stud.noroff.no$/;
const Schema = yup.object({
  email: yup.string().matches(emailRegex, 'Enter a valid email address').required(),
  password: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password must be 20 characters or less')
    .required('Enter a password'),
});

export default function LoginListener({ onLogin }) {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(Schema) });

  const onSubmit = async (data) => {
    onLogin(data);
  }

  return (
    <Container className="my-5">
      <Card>
        <Row className='g-0'>
          <Col md='6'>
            <Card.Img src='https://familyoffduty.com/wp-content/uploads/2019/03/santorini-3.jpg' alt="login form" className='rounded-start w-100' />
          </Col>

          <Col md='5'className='d-flex justify-content-center align-items-center '>
            <Card.Body className='d-flex flex-column'>
              <div className='d-flex flex-row mt-2'>
                <h1 className="h1Title fw-bold mb-0"><font color='#000000'>Ho</font><b><font color='#1a77a3'>lidaze</font></b></h1>
              </div>
              <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Login to your <b>Ho<font color='#1a77a3'>lidaze</font></b> account</h5>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="formBasicEmail" className="mb-4">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    {...register('email')}
                  />
                  <Form.Text className="text-danger">
                    {errors.email?.message}
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    {...register('password')}
                  />
                  <Form.Text className="text-danger">
                    {errors.password?.message}
                  </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit" size='m' className="mb-4 px-5">
                  Login
                </Button>
              </Form>
              <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Don't have an account? <a href="/register" style={{ color: '#f12a2a' }}><b>Register here</b></a></p>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}
