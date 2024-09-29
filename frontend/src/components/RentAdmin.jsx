import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "./css/rentadmin.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumbbell, faElevator, faSwimmingPool, faParking, faFire, faSink, faWifi, faCity, faKitchenSet, faJugDetergent, faPeopleRoof } from '@fortawesome/free-solid-svg-icons'

const RentAdmin = () => {

    const nav = useNavigate()

    const [newItem, setNewItem] = useState({
        title: '',
        location: '',
        price: '',
        beds: '',
        baths: '',
        sqft: '',
        description: '',
        agent: '',
        photo1: '',
        photo2: '',
        photo3: '',
        photo4: '',
        photo5: '',
        building: [],
        apartment: [],
    })

    const [showImages, setShowImages] = useState(Array(5).fill(null));

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        if (type === 'checkbox') {
            if (checked) {
                setNewItem((prevState) => ({
                    ...prevState,
                    [name]: [...prevState[name], value]
                }));
            } else {
                setNewItem((prevState) => ({
                    ...prevState,
                    [name]: prevState[name].filter((item) => item !== value)
                }));
            }
        } else {
            setNewItem({ ...newItem, [name]: value });
        }
    };

    const handleCheckboxChange = (e) => {
        const { name, value, checked } = e.target;
        if (checked) {
            setNewItem((prevData) => ({
                ...prevData,
                [name]: [...prevData[name], value],
            }));
        } else {
            setNewItem((prevData) => ({
                ...prevData,
                [name]: prevData[name].filter((item) => item !== value),
            }));
        }
    };

    const handleChangePhoto = (e, photoNumber) => {
        const photoKey = `photo${photoNumber}`;
        const file = e.target.files[0];

        setNewItem((prevItem) => ({
            ...prevItem,
            [photoKey]: file,
        }));

        const reader = new FileReader();
        reader.onload = () => {
            const newShowImages = [...showImages];
            newShowImages[photoNumber - 1] = reader.result;
            setShowImages(newShowImages);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        Object.entries(newItem).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((item) => {
                    formData.append(key, item);
                });
            } else {
                formData.append(key, value);
            }
        });

        axios.post('http://localhost:5000/addRent', formData)
            .then((res) => {
                console.log(res);
                console.log("Added!");
                nav('/rent');
            }).catch(err => {
                console.log("Not added" + err);
            });
    }
    return (
        <Container>
            <Row>
                <Col>
                    <Form onSubmit={handleSubmit} className='rentForm'>
                        <Form.Group className="mb-3" controlId="slugId">
                            <Form.Label>Slug</Form.Label>
                            <Form.Control type="text" value={newItem.slug} name="slug" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="titleId">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" value={newItem.title} name="title" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="locationId">
                            <Form.Label>Location</Form.Label>
                            <Form.Control type="text" value={newItem.location} name="location" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="priceId">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" value={newItem.price} name="price" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="bedsId">
                            <Form.Label>Beds</Form.Label>
                            <Form.Control type="number" value={newItem.beds} name="beds" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="bathsId">
                            <Form.Label>Baths</Form.Label>
                            <Form.Control type="number" value={newItem.baths} name="baths" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="sqftId">
                            <Form.Label>Square feet</Form.Label>
                            <Form.Control type="number" value={newItem.sqft} name="sqft" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="descriptionId">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" value={newItem.description} name="description" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="agentsId">
                            <Form.Label>Agents</Form.Label>
                            <Form.Control type="text" value={newItem.agent} name="agent" onChange={handleChange} />
                        </Form.Group>

                        
                        <Form.Group className="mb-3" controlId="buildingId">
                            <Form.Label>Building Amenities</Form.Label>
                            <div>
                                <Form.Check inline label={<><FontAwesomeIcon icon={faDumbbell} /> Gym</>} type="checkbox" name="building" value="gym" checked={newItem.building.includes('gym')} onChange={handleCheckboxChange} />
                                <Form.Check inline label={<><FontAwesomeIcon icon={faElevator} /> Elevator</>} type="checkbox" name="building" value="elevator" checked={newItem.building.includes('elevator')} onChange={handleCheckboxChange} />
                                <Form.Check inline label={<><FontAwesomeIcon icon={faPeopleRoof} /> Rooftop</>} type="checkbox" name="building" value="rooftop" checked={newItem.building.includes('rooftop')} onChange={handleCheckboxChange} />
                                <Form.Check inline label={<><FontAwesomeIcon icon={faParking} /> Parking</>} type="checkbox" name="building" value="parking" checked={newItem.building.includes('parking')} onChange={handleCheckboxChange} />
                                <Form.Check inline label={<><FontAwesomeIcon icon={faSwimmingPool} /> Outdoor Pool</>} type="checkbox" name="building" value="outdoor-pool" checked={newItem.building.includes('outdoor-pool')} onChange={handleCheckboxChange} />
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="apartmentId">
                            <Form.Label>Apartment Amenities</Form.Label>
                            <div>
                                <Form.Check inline label={<><FontAwesomeIcon icon={faFire} /> Heating</>} type="checkbox" name="apartment" value="heating" checked={newItem.apartment.includes('heating')} onChange={handleCheckboxChange} />
                                <Form.Check inline label={<><FontAwesomeIcon icon={faSink} /> Dishwasher</>} type="checkbox" name="apartment" value="dishwasher" checked={newItem.apartment.includes('dishwasher')} onChange={handleCheckboxChange} />
                                <Form.Check inline label={<><FontAwesomeIcon icon={faJugDetergent} /> Laundry</>} type="checkbox" name="apartment" value="laundry" checked={newItem.apartment.includes('laundry')} onChange={handleCheckboxChange} />
                                <Form.Check inline label={<><FontAwesomeIcon icon={faKitchenSet} /> Fully equipped kitchen</>} type="checkbox" name="apartment" value="fully-equipped-kitchen" checked={newItem.apartment.includes('fully-equipped-kitchen')} onChange={handleCheckboxChange} />
                                <Form.Check inline label={<><FontAwesomeIcon icon={faCity} /> City view</>} type="checkbox" name="apartment" value="city-view" checked={newItem.apartment.includes('city-view')} onChange={handleCheckboxChange} />
                                <Form.Check inline label={<><FontAwesomeIcon icon={faWifi} /> Wi-Fi</>} type="checkbox" name="apartment" value="wi-fi" checked={newItem.apartment.includes('wi-fi')} onChange={handleCheckboxChange} />
                            </div>
                        </Form.Group>

                        {[1, 2, 3, 4, 5].map((photoNumber) => (
                            <Form.Group key={photoNumber} className="mb-3" controlId={`photo${photoNumber}Id`}>
                                <Form.Label>{`Photo ${photoNumber}`}</Form.Label>
                                <Form.Control type="file" accept='.png, .jpg, .jpeg' name={`photo${photoNumber}`} onChange={(e) => handleChangePhoto(e, photoNumber)} />
                                {showImages[photoNumber - 1] && <img src={showImages[photoNumber - 1]} alt={`Photo ${photoNumber}`} style={{ maxWidth: '100px' }} />}
                            </Form.Group>
                        ))}


                        <Button variant="primary" type="submit" className='editButton'>
                            Submit
                        </Button>
                    </Form>
                </Col>

            </Row>
        </Container>
    )
}

export default RentAdmin