import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap'
import "./css/rentupdate.css"


const BuyUpdate = () => {
    const { slug } = useParams()
    const [updateData, setUpdateData] = useState({
        slug:"" ,
        title: '',
        location: '',
        price: '',
        photo: '',
        beds: '',
        baths: '',
        sqft: '',
    })
    const nav = useNavigate()

    useEffect(() => {
        const getData = async () => {
            await axios.get(`http://localhost:5000/buyreadOne/${slug}`)
                .then(res => {
                    const { slug,title, location, price, photo, beds, baths, sqft } = res.data
                    console.log(res.data)
                    setUpdateData(updateData => ({
                        ...updateData,
                        slug: slug || "",
                        title: title || "",
                        location: location || "",
                        price: price || "",
                        photo: photo || "",
                        beds: beds || "",
                        baths: baths || "",
                        sqft: sqft || ""
                    }))
                }).catch(err => {
                    console.log(err)

                })
        }
        getData()
    }, [slug])
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
        axios.patch(`http://localhost:5000/buyupdate/${slug}`, formData)
            .then((res) => {
                console.log(res)
                setUpdateData((datas) => ({ ...datas, ...res.data }))
                console.log("Updated")
                nav('/buy')

            })
            .catch((err) => console.log("Not added" + err))
    }
    return (
        <Container>
            <Row className="mb-4">
                <Col>
                    <Form onSubmit={handleUpdate} className='BuyForm'>
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
                        <Form.Group className="mb-3" controlId="bedsId">
                            <Form.Label>Beds</Form.Label>
                            <Form.Control type="number" value={updateData.beds} name="beds" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="bathsId">
                            <Form.Label>Baths</Form.Label>
                            <Form.Control type="number" value={updateData.baths} name="baths" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="sqftId">
                            <Form.Label>Square Feet</Form.Label>
                            <Form.Control type="number" value={updateData.sqft} name="sqft" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="photoId">
                            <Form.Label>Photo</Form.Label>
                            <Form.Control type="file" accept='.png, .jpg, .jpeg' name="photo" onChange={handleChangePhoto} />
                        </Form.Group>
                        <Button variant="primary" type="submit" className='BuyButton' style={{
                            backgroundColor: 'black',
                            color: 'white',
                            textAlign: 'center',
                            border: '2px solid black',
                            cursor: 'pointer',
                            padding: '10px 20px',
                            fontSize: '16px'
                        }}>
                            Update
                        </Button>
                    </Form>
                </Col>
                <Col>
                    {
                        showImage ? (
                            <Image src={showImage} alt="" className='img-fluid updatePhoto' />
                        ) : (
                            <Image src={`http://localhost:5000/images/${updateData.photo}`} alt="" className='img-fluid updatePhoto' style={{ width: "550px", height: "fit-content", borderRadius: "20px", marginLeft: "100px" }} />
                        )
                    }
                </Col>
            </Row>

        </Container>
    )
}

export default BuyUpdate