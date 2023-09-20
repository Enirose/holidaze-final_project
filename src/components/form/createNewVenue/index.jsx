
// import React from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import { Form, Button } from 'react-bootstrap';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { CreateVenue } from '../../../posts/create/createVenue';

// const schema = yup.object().shape({
//     name: yup.string().required('Name is required'),
//     description: yup.string().required('Description is required'),
//     media: yup.string().url('Please enter a valid URL').required('Media URL is required'),
//     price: yup.number().positive('Price must be a positive number').required('Price is required'),
//     maxGuest: yup.number().integer('Max guest must be an integer').required('Max Guest is required'),
//     meta: yup.string(),
//     location: yup.string().required('Location is required'),
// });

// export default function CreateVenueForm() {
//     const navigate = useNavigate();
//     const { handleSubmit, control, formState: { errors } } = useForm({
//         resolver: yupResolver(schema),
//     });

//     const onSubmit = async (data) => {
//         try {
//             const venueResult = await CreateVenue(data);
            
//             if (venueResult) {
//                 // Save the venue data to localStorage or perform any other necessary actions
//                 localStorage.setItem('venueData', JSON.stringify(venueResult));
                
//                 // Redirect to the profile page or another appropriate page
//                 navigate('/profile');
//             } else {
//                 alert('Failed to create a new venue. Please try again later.');
//             }
//         } catch (error) {
//             alert('Failed to create a new venue. Please try again later.');
//         }
//     };

//     return (
//         <Form onSubmit={handleSubmit(onSubmit)}>
//             <Form.Group controlId="formTitle">
//                 <Form.Label>Name</Form.Label>
//                 <Controller
//                     name="name"
//                     control={control}
//                     render={({ field }) => (
//                         <Form.Control type="text" {...field} />
//                     )}
//                 />
//                 <span className="text-danger">{errors.name?.message}</span>
//             </Form.Group>
//             <Form.Group controlId="formDescription">
//                 <Form.Label>Description</Form.Label>
//                 <Controller
//                     name="Description"
//                     control={control}
//                     render={({ field }) => (
//                         <Form.Control type="text" {...field} />
//                     )}
//                 />
//                 <span className="text-danger">{errors.name?.message}</span>
//             </Form.Group>
//             {/* Add similar Form.Group elements for other fields */}
            
//             <Button variant="primary" type="submit">
//                 Create Venue
//             </Button>
//         </Form>
//     );
// }
