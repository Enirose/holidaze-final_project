import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom"
import { EditVenue } from "../../../posts/editCreatedVenue";
import { save } from "../../../components/localStorage";
import { Col, Container, Form, Row, Card, Button } from "react-bootstrap";
import * as yup from 'yup';
import { FetchSingleVenue } from "../../../posts/getSpecificVenueById";
import { DeleteVenue } from "../../../posts/deleteVenue";
import { RiCloseLine, RiDeleteBin5Fill } from 'react-icons/ri';


const editSchema = yup.object().shape ({
    name: yup
        .string()
        .min(3, "You need at least 3 characters")
        .max(50, "Your name must be 50 characters or less")
        .required('Enter the title of you venue'),
    description: yup.string().required('Description of you venue is required'),
    // media: yup
    //     .array()
    //     .of(yup.string().url('Please enter a valid URL').notRequired())
    //     .required('At least one media URL is required'),
    price: yup.number().typeError('Please enter amount').required('Price is required'),
    maxGuests: yup
        .number()
        .typeError('Enter number of guest')
        .min(1, "Venue must room at least 1 guest")
        .required('Max Guest is required'),
    location: yup.object()
        .shape({
            country: yup.string().required('Country is required'),
            city: yup.string().required('City is required'),
        }),
})

export default function EditVenueFormListener () {
    const navigate = useNavigate();
    const {venueId} = useParams();
    const [mediaUrls, setMediaUrls] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [initialData, setInitialData] = useState(null)
    const {register, handleSubmit, formState: {errors}, setValue, getValues } = useForm({
        resolver: yupResolver(editSchema),
    });

    useEffect(() => {  // Fetch the venue data by ID from api method FetchSingleVenue you wanted to edit or update
        async function fetchData () {
            setIsLoading(true);
            setIsError(false);

            try {
                const venueData = await FetchSingleVenue(venueId);

                setInitialData(venueData);
                setMediaUrls(venueData.media || []);
            } catch (error) {
                setIsError(true);
                alert('Failed to create a new venue. Please try again later.');
            }
            setIsLoading(false);
        }
        fetchData();
    }, [venueId]);

    const onSubmit= async (data) => {   //This function will send the updated version of your venues 
        setIsLoading(true);
        setIsError(false);        
        
        data.media = mediaUrls; // Include media URLs in the data to send to the server

        try {        
            const response = await EditVenue(venueId, data); 
            if (response.ok) {
                
                // Simulate a successful update response / Venue data updated successfully
                const updatedVenueData = response.json;
                save('venueData', JSON.stringify(updatedVenueData));
                               
            } else {
                setIsError(true);
            }
        } catch (error) {
            setIsError(true);
            alert('Failed to update the venue. Please try again later.')
        } finally {
            setIsLoading(false) 
            navigate('/profile');
        }              
    };

    // Function to handle adding a media URL to the list
     const handleAddMedia = () => {
        const mediaValue = getValues('media');
        console.log(mediaValue);
        if (mediaValue) {
            setMediaUrls([...mediaUrls, mediaValue]);
            setValue('media', ''); // Clear the input field after adding
        }
    };

    const handleDeleteMedia = (index) => {  // Function to handle media deletion before updating it
        const updatedMediaUrls = [...mediaUrls];
        updatedMediaUrls.splice(index, 1); // Remove the media item at the given index
        setMediaUrls(updatedMediaUrls); // Update the mediaUrls state
    };

    if (initialData === null) {
        return <div>Loading...</div>;
    }

    const handleDelete = async () => { //execute Api function to delete the venue
        if (window.confirm("Are you sure you want to delete this venue?")) {
            try {
                const response = await DeleteVenue(venueId);

                if (response.ok) {
                    save('venueData', null);
                    navigate('/profile');
                } else {
                    setIsError(true);
                    console.log('Failed to delete the venue');
                }
            } catch (error) {
                setIsError(true);
                console.error('API Error:', error);
                alert('Failed to delete the venue. Please try again later.');
            }
        }
    };

    return(
        <Container>
            <Row>
                <Col>
                    <Card className="m-4 mb-5">
                        <div style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }}>
                            <RiCloseLine onClick={() => navigate('/profile')} />
                        </div>
                        <Card.Body>
                            <h1>Update venue!</h1>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Form.Group controlId="formTitle">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your venue title"
                                        {...register('name')}
                                        defaultValue={initialData.name}
                                    />
                                    <Form.Text className="text-danger">
                                        {errors.name?.message}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group controlId="formDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        placeholder="Describe your venue"
                                        {...register('description')}
                                        defaultValue={initialData.description}
                                    />
                                    <Form.Text className="text-danger">
                                        {errors.description?.message}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group controlId="formMedia">
                                    <Form.Label>Media</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter a media URL"
                                        {...register('media')}
                                    />
                                    <div>
                                        <Button
                                            variant="primary"
                                            onClick={handleAddMedia}
                                            className="mt-2"
                                        >
                                            Add Media
                                        </Button>
                                    </div>
                                    <Form.Text className="text-danger">
                                        {errors.media?.message}
                                    </Form.Text>
                                </Form.Group>                                
                                {/* Display uploaded media URLs as an array */}
                                {mediaUrls.length > 0 && (
                                    <div className="mb-3">
                                        <h5>Uploaded Media:</h5>
                                        <div className="d-flex justify-content">
                                            {mediaUrls.map((url, index) => (
                                                <div key={index} className="m-2">
                                                    <img
                                                        src={url}
                                                        alt={`Media ${index + 1}`}
                                                        style={{ maxWidth: '100px', maxHeight: '50px' }}
                                                    />
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => handleDeleteMedia(index)}
                                                    >
                                                        <RiDeleteBin5Fill/>
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <Row className="mt-3">
                                    <Col>
                                        <Card>
                                            <Card.Body>
                                                <h4>Address</h4>
                                                <Form.Group controlId="formBasicCountry">
                                                    <Form.Label>Country</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Country"
                                                        {...register('location.country')}
                                                        defaultValue={initialData.location.country}
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
                                                        {...register('location.city')}
                                                        defaultValue={initialData.location.city}
                                                    />
                                                    <Form.Text className="text-danger">
                                                        {errors.city?.message}
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
                                                        defaultValue={initialData.price}
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
                                                        {...register('maxGuests')}
                                                        defaultValue={initialData.maxGuests}
                                                    />
                                                    <Form.Text className="text-danger">
                                                        {errors.maxGuests?.message}
                                                    </Form.Text>
                                                </Form.Group>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card>
                                            <Card.Body>
                                                <h4>We offers</h4>
                                                <Form.Group controlId="formBasicMetaParking">
                                                    <Form.Check
                                                        type="checkbox"
                                                        label="Parking"
                                                        {...register('meta.parking')}
                                                        defaultChecked={initialData.meta.parking} // Set the initial value
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
                                                        defaultChecked={initialData.meta.wifi}
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
                                                        defaultChecked={initialData.meta.breakfast}                                                        
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
                                                        defaultChecked={initialData.meta.pets}
                                                    />
                                                    <Form.Text className="text-danger">
                                                        {errors.meta?.message}
                                                    </Form.Text>
                                                </Form.Group>
                                            </Card.Body>
                                        </Card>
                                    </Col>                                                                         
                                </Row>                                
                                <Row>
                                    <Col className="mt-2">
                                        <Button variant="primary" type="submit" disabled={isLoading}>
                                            {isLoading ? 'Updating...' : 'Update'}
                                        </Button>
                                        <Button variant="danger" onClick={handleDelete}>
                                        Delete
                                        </Button>
                                        {isError && (
                                            <div className="mt-2 text-danger">
                                                Failed to update venue. Please try again later.
                                            </div>
                                        )}
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}