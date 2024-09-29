import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap'
import './css/teamupdate.css'

const TeamUpdate = () => {

    const { id } = useParams()
    const [updateData, setUpdateData] = useState({
        name: "",
        photo: "",
        email: '',
        phone: ''
    })
    const nav = useNavigate()
    
    useEffect(() => {
        const getData = async () => {
            await axios.get(`http://localhost:5000/readOne/${id}`)
                .then(res => {
                    const { name, photo, email, phone } = res.data
                    console.log(res.data)
                    setUpdateData(updateData => ({
                        ...updateData,
                        name: name || "",
                        email: email || "",
                        phone: phone || "",
                        photo: photo || ""
                    }))
                }).catch(err => {
                    console.log(err)

                })
        }
        getData()
    }, [id])
    const [showImage, setShowImage] = useState(null)

    const handleChange = (e) => {
        const { name, value } = e.target
        setUpdateData((data) => (
            {
                ...data,
                [name]: value
            }
        ))
    }

    const handleChangePhoto = (e) => {
        setUpdateData((data) => (
            {
                ...data,
                photo: e.target.files[0]
            }
        ))
        setShowImage(URL.createObjectURL(e.target.files[0]))
    }
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
        axios.patch(`http://localhost:5000/update/${id}`, formData)
            .then((res) => {
                console.log(res)
                setUpdateData((datas) => ({ ...datas, ...res.data }))
                console.log("Updated")
                nav('/team')

            })
            .catch((err) => console.log("Not added" + err))
    }
    return (
        <Container>
            <Row  className="mb-4">
                <Col>
                    <Form onSubmit={handleUpdate} className='updateForm'>
                        <Form.Group className="mb-3" controlId="nameId">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={updateData.name} name="name" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="emailId">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" value={updateData.email} name="email" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="phoneId">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" value={updateData.phone} name="phone" onChange={handleChange} />
                        </Form.Group>
                       
                        <Form.Group className="mb-3" controlId="photoId">
                            <Form.Label>Photo</Form.Label>
                            <Form.Control type="file" name="photo" accept='.png, .jpg, .jpeg' onChange={handleChangePhoto} />
                        </Form.Group>
                        <Button variant="primary" type="submit" className='updateButton'>
                            Update
                        </Button>
                    </Form>
                </Col>
                <Col>
                    {
                        showImage ? (
                            <Image src={showImage} alt="" className='img-fluid updatePhoto' />
                        ) : (
                            <Image src={`http://localhost:5000/images/${updateData.photo}`} alt="" className='img-fluid updatePhoto' />
                        )
                    }
                </Col>
            </Row>

        </Container>
    )
}

export default TeamUpdate