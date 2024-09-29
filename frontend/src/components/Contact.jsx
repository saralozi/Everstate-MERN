import React, { useState } from 'react';
import { Container, Button, Form, Row, Col, Card } from 'react-bootstrap';
import './css/contact.css';
import axios from 'axios';

const Contact = () => {
    const [newContact, setNewContact] = useState({
        name: "",
        surname: '',
        email: "",
        phone: "",
        message: ""
    });

    const [messageOk, setMessageOk] = useState('');

    const handleContact = (e) => {
        setNewContact({ ...newContact, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/contact', newContact)
            .then((res) => {
                console.log(res.data);
                setMessageOk("Message sent successfully!");
            })
            .catch(err => {
                console.log("Not added" + err);
            });
    };

    return (
        <Container>
            <h2 className='contactTitle'>Get in touch</h2>

            <Form onSubmit={handleSubmit} className='contactForm'>
                <Row md={12}>
                    <Form.Group className="mb-3" controlId="nameId">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" placeholder="First Name" value={newContact.name} onChange={handleContact} />
                    </Form.Group>
                </Row>

                <Row md={12}>
                    <Form.Group className="mb-3" controlId="surnameId">
                        <Form.Label>Surname</Form.Label>
                        <Form.Control type="text" name="surname" placeholder="Last Name" value={newContact.surname} onChange={handleContact} />
                    </Form.Group>
                </Row>

                <Row md={12}>
                    <Form.Group className="mb-3" controlId="emailId">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" placeholder="mail@example.com" value={newContact.email} onChange={handleContact} />
                    </Form.Group>
                </Row>

                <Row md={12}>
                    <Form.Group className="mb-3" controlId="phoneId">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="number" name="phone" placeholder="Phone Number" value={newContact.phone} onChange={handleContact} />
                    </Form.Group>
                </Row>

                <Row md={12}>
                    <Form.Group className="mb-3" controlId="messageId">
                        <Form.Label>Message</Form.Label>
                        <Form.Control as="textarea" rows={3} name="message" placeholder="Write a message" value={newContact.message} onChange={handleContact} />
                    </Form.Group>
                </Row>

                <Button variant="primary" type="submit" className='contactButton'>
                    Submit
                </Button>
                <h3 className='addedContact'>{messageOk}</h3>
            </Form>

            <div className='mapCard'>
                
                    <Row>
                       <Col>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.3231663939687!2d19.8146362!3d41.3235856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1350313540c99c4b%3A0x7398d6f11582ba30!2sDominusoft%20Education!5e0!3m2!1sen!2s!4v1710872037889!5m2!1sen!2s" title="map" width="100%" height="450" style={{border:'0', borderRadius:'10px' , boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </Col>
                    </Row>
                
            </div>
        </Container>
    );
};

export default Contact;
