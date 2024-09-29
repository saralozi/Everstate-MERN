import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Image, Button } from 'react-bootstrap'
import "./css/rentreadone.css"
const BuyReadOne = () => {
    const { slug } = useParams()
    console.log('Slug:', slug);
    const [itemData, setItemData] = useState({})
    const nav = useNavigate()
    window.scrollTo(0, 0);

    useEffect(() => {
        const getData = async () => {
            await axios.get(`http://localhost:5000/buyreadOne/${slug}`)
                .then(res => {
                    console.log(res.data)
                    setItemData(res.data)
                }).catch(err => {
                    console.log(err)
                })
        }
        getData()
    }, [slug])

    const handleDelete = async (slug) => {
        await axios.delete(`http://localhost:5000/buydelete/${slug}`)
            .then(res => {
                console.log("Deleted")
                nav('/buy')
            }).catch(err => {
                console.log("Not deleted")
            })
    }
    return (
        <Container>
            <Row>
                <Col>
                    <h2 className='readone'>{itemData.name}</h2>
                    <Image src={`http://localhost:5000/images/${itemData.photo}`} className='img-fluid readoneimage' style={{ width: "400px", marginBottom: "20px", borderRadius: "20px" }} alt="Item" />
                    <Button variant="primary" type="submit" className='deleteButton' onClick={() => handleDelete(itemData.slug)}>Delete</Button>
                    <Button variant="primary" type="submit" className='updateButton' href={`/buyupdate/${itemData.slug}`}>Update</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default BuyReadOne