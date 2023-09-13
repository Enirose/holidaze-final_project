import React from 'react';
import { useForm } from 'react-hook-form';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


const emailRegex = /^[\w\-.]+@stud.noroff.no$/;
const Schema = yup.object ({
    email: yup.string().matches(emailRegex, 'Enter valid email address').required(),
    password: yup.string()
        .min(8,'Password must be min. 8 character')
        .max(20, 'Make sure your password has 25 characters or less')
        .required('Enter a password'),
});

/**
 * Component for login Form
 * @returns 
 */

export default function LoginListener({onLogin}) {
    const {register, handleSubmit, formState: {errors}, } = useForm ({resolver: yupResolver (Schema)});


    const onSubmit = async (data) => {
        onLogin(data);
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <h2>Login</h2>
                            <Form onSubmit={handleSubmit(onSubmit)}>
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
                                        placeholder="Password"
                                        {...register('password')}
                                    />
                                    <Form.Text className="text-danger">
                                        {errors.password?.message}
                                    </Form.Text>
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Login
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );


}