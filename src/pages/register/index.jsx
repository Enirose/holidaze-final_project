import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { RegisterUser } from '../../posts/auth/register';
import {Container, Row, Col, Form, Button, Card} from 'react-bootstrap';


const Schema = yup.object ({
    fullName: yup
        .string()
        .trim()
        .min(3, 'Must be at least 3 characters long')
        .max(30, 'Your name must be 30 character or less')
        .matches(/^[a-zA-Z_]*$/, "Valid characters: a-z, A-Z and underscore.")
        .required('Enter your name'),
    email: yup
        .string()
        .matches(/^[\w\-.]+@stud.noroff.no$/, "Enter valid email address")
        .required('Enter a valid email address'),
    password: yup
        .string()
        .min(8,'Password must be min. 8 character')
        .max(20, 'Make sure your password has 25 characters or less')
        .required('Enter a password'),
    avatar: yup
        .string()
        .url()
        .required('Please use a valid image url'),
});

export default function RegisterListener () {
    const {register, handleSubmit, formState:{ errors }, } = useForm({ resolver: yupResolver (Schema) })

    async function onSubmit(data){
        try {
            const result = await RegisterUser(data);
            if (result){
                alert('Registration complete');
            } else {
                alert('Registration failed. Please try again later.');
            }
        } catch (error) {
            console.error('Error during registration', error);
            alert('Registration failed. Please try again later.');
        }
    }

    return (
        
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Card >
                        <Card.Body>
                            <h2>Registration</h2>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Form.Group controlId="formbasicFullName">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                        {...register("fullName")}
                                        type="text"
                                        name="fullName"
                                    />
                                    <Form.Text>{errors.fullName?.message}</Form.Text>
                                </Form.Group>

                                <Form.Group controlId="FormEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        {...register("email")}
                                        type="email"
                                        name="email"
                                    />
                                    <Form.Text>{errors.email?.message}</Form.Text>
                                </Form.Group>

                                <Form.Group controlId="FormPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        {...register("password")}
                                        type="password"
                                        name="password"
                                    />
                                    <Form.Text>{errors.password?.message}</Form.Text>
                                </Form.Group>

                                {/* <Form.Group controlId="FormAvatar">
                                    <Form.Label>Avatar URL</Form.Label>
                                    <Form.Control
                                        {...register("avatar")}
                                        type="url"
                                        name="avatar"
                                    />
                                    <Form.Text>{errors.avatar?.message}</Form.Text>
                                </Form.Group> */}

                                <Button type="submit" variant="primary">
                                    Register
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                
                </Col>
            </Row>
        </Container>
    );
}