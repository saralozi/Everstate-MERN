import React, {useState} from 'react'
import {Container, Row, Col, Form, Button} from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './css/teamadmin.css'

const TeamAdmin = () => {

    const nav = useNavigate()

    const [newItem, setNewItem] = useState({
        name: '',
        photo: '',
        email: '',
        phone: ''
    })

    const [showImage, setShowImage] = useState(null)

    const handleChange = (e) => {
        setNewItem({...newItem, [e.target.name]: e.target.value})
    }

    const handleChangePhoto = (e) => {
        setNewItem({...newItem, photo: e.target.files[0]})
        setShowImage(URL.createObjectURL(e.target.files[0]))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
      
        Object.entries(newItem).forEach(([key, value])=>{
            formData.append(key, value)
        })

        axios.post('http://localhost:5000/add', formData) 
        .then((res) => {
            console.log(res)
            console.log("Added!")
            nav('/team')
        }).catch(err => {
            console.log("Not added" + err)
        })
    }

  return (
    <Container>
    <Row>
        <Col>
            <Form onSubmit={handleSubmit} className='agentForm'>
                <Form.Group className="mb-3" controlId="nameId">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={newItem.name} name="name" onChange={handleChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="emailId">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" value={newItem.email} name="email" onChange={handleChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="phoneId">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" value={newItem.phone} name="phone" onChange={handleChange}/>
                </Form.Group>
               
                <Form.Group className="mb-3" controlId="photoId">
                    <Form.Label>Photo</Form.Label>
                    <Form.Control type="file" accept='.png, .jpg, .jpeg' name="photo" onChange={handleChangePhoto}/>
                </Form.Group>
                
                <Button variant="primary" type="submit" className='editButton'>
                    Submit
                </Button>
            </Form>
        </Col>

    </Row>
</Container>
  )
}

export default TeamAdmin