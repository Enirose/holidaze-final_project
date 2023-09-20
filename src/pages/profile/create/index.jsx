// // // export default function CreateNewVenueListener () {
    
// // // }


// // import React, { useState } from 'react';
// // import { useForm } from 'react-hook-form';
// // import { useNavigate } from 'react-router-dom';
// // import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
// // import * as yup from 'yup';
// // import { yupResolver } from '@hookform/resolvers/yup';
// // import { CreateVenue } from '../../../posts/create/createVenue';

// // const schema = yup.object().shape({
// //     name: yup
// //         .string()
// //         .min(3, "You need at least 3 characters")
// //         .max(50, "Your name must be 50 characters or less")
// //         .required('Enter the title of you venue'),
// //     description: yup.string().required('Description of you venue is required'),
// //     media: yup
// //         .string()
// //         .url('Please enter a valid URL')
// //         .matches(/^(http(s):\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/,
// //         "Enter a valid url")
// //         .required('Media URL is required'),
// //     price: yup.number().typeError('Please enter amount').required('Price is required'),
// //     maxGuest: yup
// //         .number()
// //         .typeError('Enter number of guest')
// //         .min(1, "Venue must room at least 1 guest")
// //         .required('Max Guest is required'),
// //     // meta: yup.boolean(),
// //     country: yup.string().required('Country is required'),
// //     city: yup.string().required('Enter the city'),
// // });

// // export default function CreateVenueFormListener() {
// //     const navigate = useNavigate();
// //     const [isLoading, setIsLoading] = useState(false);
// //     const [isError, setIsError] = useState(false);
// //     const { register, handleSubmit, formState: { errors } } = useForm({
// //         resolver: yupResolver(schema),
// //     });

// //     const onSubmit = async (data) => {
// //         setIsLoading(true);
// //         setIsError(false); // Set to false if checkbox is not checked
// //         console.log('Data being sent to the server:', data)
// //         try {
// //             const venueResult = await CreateVenue(data);
            
// //             if (venueResult) {
// //                 // Save the venue data to localStorage or perform any other necessary actions
// //                 localStorage.setItem('venueData', JSON.stringify(venueResult));
                
// //                 // Redirect to the profile page or another appropriate page
// //                 navigate('/profile');
// //             } else {
// //                 setIsError(true);
// //                 alert('Failed to create a new venue. Please try again later.');
// //             }
// //         } catch (error) {
// //             setIsError(true);
// //             alert('Failed to create a new venue. Please try again later.');
// //         }
// //         setIsLoading(false);
// //     };

// //     return (
// //         <Container>
// //             <Row>
// //                 <Col>
// //                     <Card>
// //                         <Card.Body>
// //                             <h1> Create your venue</h1>
// //                             <Form onSubmit={handleSubmit(onSubmit)}>
// //                                 <Form.Group controlId="formTitle">
// //                                     <Form.Label>Title</Form.Label>
// //                                     <Form.Control
// //                                         type="text"
// //                                         placeholder="Enter your venue title"
// //                                         {...register('name')}
// //                                     />
// //                                     <Form.Text className="text-danger">
// //                                         {errors.name?.message}
// //                                     </Form.Text>
// //                                 </Form.Group>
// //                                 <Form.Group controlId="formTitle">
// //                                     <Form.Label>Description</Form.Label>
// //                                     <Form.Control
// //                                         as="textarea"
// //                                         rows={4}
// //                                         placeholder="Describe your venue"
// //                                         {...register('description')}
// //                                     />
// //                                     <Form.Text className="text-danger">
// //                                         {errors.description?.message}
// //                                     </Form.Text>
// //                                 </Form.Group>
// //                                 <Form.Group controlId="formTitle">
// //                                     <Form.Label>Media</Form.Label>
// //                                     <Form.Control
// //                                         type="text"
// //                                         placeholder="Enter your venue title"
// //                                         {...register('media')}
// //                                     />
// //                                     <Form.Text className="text-danger">
// //                                         {errors.media?.message}
// //                                     </Form.Text>
// //                                 </Form.Group>
// //                                 <Row>
// //                                     <Col>
// //                                         <Card>
// //                                             <Card.Body>
// //                                                 <h4>What this place offers</h4>
// //                                                 <Form.Group controlId="formBasicMetaParking">
// //                                                     <Form.Check
// //                                                         type="checkbox"
// //                                                         label="Parking"
// //                                                         {...register('meta.parking')}
// //                                                     />
// //                                                     <Form.Text className="text-danger">
// //                                                         {errors.meta?.message}
// //                                                     </Form.Text>
// //                                                 </Form.Group>
// //                                                 <Form.Group controlId="formBasicMetaWifi">
// //                                                     <Form.Check
// //                                                         type="checkbox"
// //                                                         label="Wifi"
// //                                                         {...register('meta.wifi')}
// //                                                     />
// //                                                     <Form.Text className="text-danger">
// //                                                         {errors.meta?.message}
// //                                                     </Form.Text>
// //                                                 </Form.Group>
// //                                                 <Form.Group controlId="formBasicMetaBreakfast">
// //                                                     <Form.Check
// //                                                         type="checkbox"
// //                                                         label="Breakfast"
// //                                                         {...register('meta.breakfast')}
// //                                                     />
// //                                                     <Form.Text className="text-danger">
// //                                                         {errors.meta?.message}
// //                                                     </Form.Text>
// //                                                 </Form.Group>
// //                                                 <Form.Group controlId="formBasicMetaPets">
// //                                                     <Form.Check
// //                                                         type="checkbox"
// //                                                         label="Pets"
// //                                                         {...register('meta.pets')}
// //                                                     />
// //                                                     <Form.Text className="text-danger">
// //                                                         {errors.meta?.message}
// //                                                     </Form.Text>
// //                                                 </Form.Group>
// //                                             </Card.Body>
// //                                         </Card>
// //                                     </Col> 
// //                                     <Col>
// //                                         <Card>
// //                                             <Card.Body>
// //                                                 <h4>Price and Guest</h4>
// //                                                 <Form.Group controlId="formBasicPrice">
// //                                                     <Form.Label>Price per night / kr</Form.Label>
// //                                                     <Form.Control
// //                                                         type="number"
// //                                                         placeholder="Price per night"
// //                                                         {...register('price')}
// //                                                     />
// //                                                     <Form.Text className="text-danger">
// //                                                         {errors.price?.message}
// //                                                     </Form.Text>
// //                                                 </Form.Group>
// //                                                 <Form.Group controlId="formBasicMaxGuest">
// //                                                     <Form.Label>Max. Guest</Form.Label>
// //                                                     <Form.Control
// //                                                         type="number"
// //                                                         placeholder="Enter max.guest"
// //                                                         {...register('maxGuest')}
// //                                                     />
// //                                                     <Form.Text className="text-danger">
// //                                                         {errors.maxGuest?.message}
// //                                                     </Form.Text>
// //                                                 </Form.Group>
// //                                             </Card.Body>
// //                                         </Card>
// //                                     </Col>
// //                                     <Col>
// //                                         <Card>
// //                                             <Card.Body>
// //                                                 <h4>Address</h4>
// //                                                 <Form.Group controlId="formBasicCountry">
// //                                                     <Form.Label>Country</Form.Label>
// //                                                     <Form.Control
// //                                                         type="text"
// //                                                         placeholder="Country"
// //                                                         {...register('country')}
// //                                                     />
// //                                                     <Form.Text className="text-danger">
// //                                                         {errors.country?.message}
// //                                                     </Form.Text>
// //                                                 </Form.Group>
// //                                                 <Form.Group controlId="formBasicCity">
// //                                                     <Form.Label>City</Form.Label>
// //                                                     <Form.Control
// //                                                         type="text"
// //                                                         placeholder="Enter city"
// //                                                         {...register('city')}
// //                                                     />
// //                                                     <Form.Text className="text-danger">
// //                                                         {errors.city?.message}
// //                                                     </Form.Text>
// //                                                 </Form.Group>
// //                                             </Card.Body>
// //                                         </Card>
// //                                     </Col>
// //                                 </Row>

                            
// //                                 {/* Add similar Form.Group elements for other fields */}
                                
// //                                 <Button variant="primary" type="submit" disabled={isLoading}>
// //                                     {isLoading ? 'Registering...' : 'Register'}
// //                                 </Button>
// //                                 {isError && (
// //                                     <div className="mt-2 text-danger">
// //                                         Registration failed. Please try again later.
// //                                     </div>
// //                                 )}
// //                             </Form>
// //                         </Card.Body>
// //                     </Card>
// //                 </Col>
// //             </Row>
// //         </Container>
        
// //     );
// // }

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateVenue } from '../../../posts/create/createVenue';

const schema = yup.object().shape({
    name: yup
        .string()
        .min(3, "You need at least 3 characters")
        .max(50, "Your name must be 50 characters or less")
        .required('Enter the title of your venue'),
    description: yup.string().required('Description of your venue is required'),
    media: yup
        .string()
        .url('Please enter a valid URL')
        .matches(/^(http(s):\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/,
        "Enter a valid URL")
        .required('Media URL is required'),
    price: yup.number().typeError('Please enter amount').required('Price is required'),
    maxGuest: yup
        .number()
        .typeError('Enter number of guests')
        .min(1, "Venue must accommodate at least 1 guest")
        .required('Max Guest is required'),
    location: yup.object ({
        country: yup.string().required('Country is required'),
        city: yup.string().required('Enter the city'),
    })
    
});

export default function CreateVenueFormListener() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        setIsError(false); // Set to false if checkbox is not checked
        console.log('Data being sent to the server:', data)
        try {
            const venueResult = await CreateVenue(data);
            
            if (venueResult) {
                // Save the venue data to localStorage or perform any other necessary actions
                localStorage.setItem('venueData', JSON.stringify(venueResult));
                
                // Redirect to the profile page or another appropriate page
                navigate('/profile');
            } else {
                setIsError(true);
                alert('Failed to create a new venue. Please try again later.');
            }
        } catch (error) {
            setIsError(true);
            alert('Failed to create a new venue. Please try again later.');
        }
        setIsLoading(false);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <h1> Create your venue</h1>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Form.Group controlId="formTitle">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your venue title"
                                        {...register('name')}
                                    />
                                    <Form.Text className="text-danger">
                                        {errors.name?.message}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group controlId="formTitle">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        placeholder="Describe your venue"
                                        {...register('description')}
                                    />
                                    <Form.Text className="text-danger">
                                        {errors.description?.message}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group controlId="formTitle">
                                    <Form.Label>Media</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your venue title"
                                        {...register('media')}
                                    />
                                    <Form.Text className="text-danger">
                                        {errors.media?.message}
                                    </Form.Text>
                                </Form.Group>
                                <Row>
                                    <Col>
                                        <Card>
                                            <Card.Body>
                                                <h4>What this place offers</h4>
                                                <Form.Group controlId="formBasicMetaParking">
                                                    <Form.Check
                                                        type="checkbox"
                                                        label="Parking"
                                                        {...register('meta.parking')}
                                                    />
                                                    <Form.Text className="text-danger">
                                                        {errors.meta?.message}
                                                    </Form.Text>
                                                </Form.Group>
                                                <Form.Group controlId="formBasicMetaWifi">
                                                    <Form.Check
                                                        type="checkbox"
                                                        label="Wifi"
                                                        {...register('meta.wifi')}
                                                    />
                                                    <Form.Text className="text-danger">
                                                        {errors.meta?.message}
                                                    </Form.Text>
                                                </Form.Group>
                                                <Form.Group controlId="formBasicMetaBreakfast">
                                                    <Form.Check
                                                        type="checkbox"
                                                        label="Breakfast"
                                                        {...register('meta.breakfast')}
                                                    />
                                                    <Form.Text className="text-danger">
                                                        {errors.meta?.message}
                                                    </Form.Text>
                                                </Form.Group>
                                                <Form.Group controlId="formBasicMetaPets">
                                                    <Form.Check
                                                        type="checkbox"
                                                        label="Pets"
                                                        {...register('meta.pets')}
                                                    />
                                                    <Form.Text className="text-danger">
                                                        {errors.meta?.message}
                                                    </Form.Text>
                                                </Form.Group>
                                            </Card.Body>
                                        </Card>
                                    </Col> 
                                    <Col>
                                        <Card>
                                            <Card.Body>
                                                <h4>Price and Guest</h4>
                                                <Form.Group controlId="formBasicPrice">
                                                    <Form.Label>Price per night / kr</Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        placeholder="Price per night"
                                                        {...register('price')}
                                                    />
                                                    <Form.Text className="text-danger">
                                                        {errors.price?.message}
                                                    </Form.Text>
                                                </Form.Group>
                                                <Form.Group controlId="formBasicMaxGuest">
                                                    <Form.Label>Max. Guest</Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        placeholder="Enter max.guest"
                                                        {...register('maxGuest')}
                                                    />
                                                    <Form.Text className="text-danger">
                                                        {errors.maxGuest?.message}
                                                    </Form.Text>
                                                </Form.Group>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card>
                                            <Card.Body>
                                                <h4>Address</h4>
                                                <Form.Group controlId="formBasicCountry">
                                                    <Form.Label>Country</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Country"
                                                        {...register('country')}
                                                    />
                                                    <Form.Text className="text-danger">
                                                        {errors.country?.message}
                                                    </Form.Text>
                                                </Form.Group>
                                                <Form.Group controlId="formBasicCity">
                                                    <Form.Label>City</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter city"
                                                        {...register('city')}
                                                    />
                                                    <Form.Text className="text-danger">
                                                        {errors.city?.message}
                                                    </Form.Text>
                                                </Form.Group>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                                {/* Form fields here */}
                                {/* ... */}
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

// CreateVenue function remains the same as in your original code
