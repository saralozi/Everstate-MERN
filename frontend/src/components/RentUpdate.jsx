import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumbbell, faElevator, faSwimmingPool, faParking, faFire, faSink, faWifi, faCity, faKitchenSet, faJugDetergent, faPeopleRoof } from '@fortawesome/free-solid-svg-icons'
import "./css/rentupdate.css"

const RentUpdate = () => {
    const { slug } = useParams()
    const [updateData, setUpdateData] = useState({
        slug: '',
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
    const nav = useNavigate()

    useEffect(() => {
        const getData = async () => {
            await axios.get(`http://localhost:5000/readOneRent/${slug}`)
                .then(res => {
                    const { slug, title, location, price, beds, baths, sqft, description, agent, photo1, photo2, photo3, photo4, photo5} = res.data
                    console.log(res.data)
                    setUpdateData(updateData => ({
                        ...updateData,
                        title: title || "",
                        slug: slug || "",
                        baths: baths || "",
                        location: location || "",
                        sqft: sqft || "",
                        beds: beds || "",
                        price: price || "",
                        description: description || "",
                        agent: agent || "",
                        photo1: photo1 || "",
                        photo2: photo2 || "",
                        photo3: photo3 || "",
                        photo4: photo4 || "",
                        photo5: photo5 || "",

                    }))
                }).catch(err => {
                    console.log(err)
                })
        }
        getData()
    }, [slug])
   
    const [showImages, setShowImages] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target
        setUpdateData((data) => (
            {
                ...data,
                [name]: value
            }
        ))
    }

    const handleCheckboxChange = (e) => {
        const { name, value, checked } = e.target;
        if (checked) {
            setUpdateData((prevData) => ({
                ...prevData,
                [name]: [...prevData[name], value],
            }));
        } else {
            setUpdateData((prevData) => ({
                ...prevData,
                [name]: prevData[name].filter((item) => item !== value),
            }));
        }
    };

    const handleChangePhoto = (e, index) => {
        const file = e.target.files[0];
        setUpdateData((prevData) => ({
            ...prevData,
            [`photo${index}`]: file,
        }));
        setShowImages((prevImages) => {
            const newImages = [...prevImages];
            newImages[index - 1] = URL.createObjectURL(file);
            return newImages;
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault()
        const formData = new FormData()

        Object.entries(updateData).forEach(([key, value]) => {
            if (key !== 'photo') {
                formData.append(key, value)
            }
        })
        if (updateData.photo instanceof File) {
            formData.append('photo', updateData.photo)
        }
        axios.patch(`http://localhost:5000/updateRent/${slug}`, formData)
            .then((res) => {
                console.log(res)
                setUpdateData((datas) => ({ ...datas, ...res.data }))
                console.log("Updated")
                nav('/rent')
            })
            .catch((err) => console.log("Not added" + err))
    }

    return (
        <Container>
            <Row className="mb-4">
                <Col>
                    <Form onSubmit={handleUpdate} className='updateRentForm'>
                        <Form.Group className="mb-3" controlId="slugId">
                            <Form.Label>Slug</Form.Label>
                            <Form.Control type="text" value={updateData.slug} name="slug" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="titleId">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" value={updateData.title} name="title" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="locationId">
                            <Form.Label>Location</Form.Label>
                            <Form.Control type="text" value={updateData.location} name="location" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="priceId">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" value={updateData.price} name="price" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="numberId">
                            <Form.Label>Beds</Form.Label>
                            <Form.Control type="number" value={updateData.beds} name="beds" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="bathsId">
                            <Form.Label>Baths</Form.Label>
                            <Form.Control type="number" value={updateData.baths} name="baths" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="sqftId">
                            <Form.Label>Square feet</Form.Label>
                            <Form.Control type="number" value={updateData.sqft} name="sqft" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="descriptionId">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" value={updateData.description} name="description" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="agentsId">
                            <Form.Label>Agents</Form.Label>
                            <Form.Control type="text" value={updateData.agent} name="agent" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="buildingId">
                            <Form.Label>Building Amenities</Form.Label>
                            <div>
                                <Form.Check inline label={<><FontAwesomeIcon icon={faDumbbell} /> Gym</>} type="checkbox" name="building" value="gym" checked={updateData.building.includes('gym')} onChange={handleCheckboxChange} />
                                <Form.Check inline label={<><FontAwesomeIcon icon={faElevator} /> Elevator</>} type="checkbox" name="building" value="elevator" checked={updateData.building.includes('elevator')} onChange={handleCheckboxChange} />
                                <Form.Check inline label={<><FontAwesomeIcon icon={faPeopleRoof} /> Rooftop</>} type="checkbox" name="building" value="rooftop" checked={updateData.building.includes('rooftop')} onChange={handleCheckboxChange} />
                                <Form.Check inline label={<><FontAwesomeIcon icon={faParking} /> Parking</>} type="checkbox" name="building" value="parking" checked={updateData.building.includes('parking')} onChange={handleCheckboxChange} />
                                <Form.Check inline label={<><FontAwesomeIcon icon={faSwimmingPool} /> Outdoor Pool</>} type="checkbox" name="building" value="outdoor-pool" checked={updateData.building.includes('outdoor-pool')} onChange={handleCheckboxChange} />
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="apartmentId">
                            <Form.Label>Apartment Amenities</Form.Label>
                            <div>
                                <Form.Check inline label={<><FontAwesomeIcon icon={faFire} /> Heating</>} type="checkbox" name="apartment" value="heating" checked={updateData.apartment.includes('heating')} onChange={handleCheckboxChange} />
                                <Form.Check inline label={<><FontAwesomeIcon icon={faSink} /> Dishwasher</>} type="checkbox" name="apartment" value="dishwasher" checked={updateData.apartment.includes('dishwasher')} onChange={handleCheckboxChange} />
                                <Form.Check inline label={<><FontAwesomeIcon icon={faJugDetergent} /> Laundry</>} type="checkbox" name="apartment" value="laundry" checked={updateData.apartment.includes('laundry')} onChange={handleCheckboxChange} />
                                <Form.Check inline label={<><FontAwesomeIcon icon={faKitchenSet} /> Fully equipped kitchen</>} type="checkbox" name="apartment" value="fully-equipped-kitchen" checked={updateData.apartment.includes('fully-equipped-kitchen')} onChange={handleCheckboxChange} />
                                <Form.Check inline label={<><FontAwesomeIcon icon={faCity} /> City view</>} type="checkbox" name="apartment" value="city-view" checked={updateData.apartment.includes('city-view')} onChange={handleCheckboxChange} />
                                <Form.Check inline label={<><FontAwesomeIcon icon={faWifi} /> Wi-Fi</>} type="checkbox" name="apartment" value="wi-fi" checked={updateData.apartment.includes('wi-fi')} onChange={handleCheckboxChange} />
                            </div>
                        </Form.Group>

                        {[1, 2, 3, 4, 5].map((photoNumber) => (
                            <Form.Group key={photoNumber} className="mb-3" controlId={`photo${photoNumber}Id`}>
                                <Form.Label>{`Photo ${photoNumber}`}</Form.Label>
                                <Form.Control type="file" accept='.png, .jpg, .jpeg' name={`photo${photoNumber}`} onChange={(e) => handleChangePhoto(e, photoNumber)} />
                                {showImages[photoNumber - 1] && <img src={showImages[photoNumber - 1]} alt={`Photo ${photoNumber}`} style={{ maxWidth: '100px' }} />}
                            </Form.Group>
                        ))}

                        <Button variant="primary" type="submit" className='updateButton'>
                            Update
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default RentUpdate
