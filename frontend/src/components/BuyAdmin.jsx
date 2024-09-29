import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const BuyAdmin = () => {
    const nav = useNavigate();

    const [newItem, setNewItem] = useState({
        slug:"",
        title: '',  
        location: '',
        price: '',
        photo: '',
        beds: '',
        baths: '',
        sqft: '',
    });
    
// eslint-disable-next-line
    const [showImage, setShowImage] = useState(null);
    const handleChange = (e) => {
        setNewItem({ ...newItem, [e.target.name]: e.target.value });
    };
  
    const handleChangePhoto = (e) => {
        setNewItem({ ...newItem, photo: e.target.files[0] });
        setShowImage(URL.createObjectURL(e.target.files[0]));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        Object.entries(newItem).forEach(([key, value]) => {
            formData.append(key, value);
        });

        axios.post('http://localhost:5000/addbuy', formData)
            .then((res) => {
                console.log(res);
                console.log("Added!");
                nav('/buy');
            })
            .catch(err => {
                console.log("Not added" + err);
            });
    };
    return (
        <Container>
            <Row>
                <Col>
                    <Form onSubmit={handleSubmit} className='BuyForm'>
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
                            <Form.Label>Square Feet</Form.Label>
                            <Form.Control type="number" value={newItem.sqft} name="sqft" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="photoId">
                            <Form.Label>Photo</Form.Label>
                            <Form.Control type="file" accept='.png, .jpg, .jpeg' name="photo" onChange={handleChangePhoto} />
                        </Form.Group>
                        <Button variant="primary" type="submit" className='BuyButton'>
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
export default BuyAdmin;