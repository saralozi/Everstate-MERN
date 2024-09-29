
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Image, Button } from 'react-bootstrap'
import './css/rentreadone.css'

const RentReadOne = () => {

    const { id } = useParams()
    const nav = useNavigate()
    const [itemData, setItemData] = useState({})

    useEffect(() => {
        const getData = async () => {
            await axios.get(`http://localhost:5000/readOneRent/${id}`)
                .then(res => {
                    console.log(res.data)
                    setItemData(res.data)
                }).catch(err => {
                    console.log(err)
                })
        }
        getData()
    }, [id])

    const handleDelete = async(id)=>{
        await axios.delete(`http://localhost:5000/deleteRent/${id}`)
        .then(res => {
            console.log("Deleted")
            nav('/rent')
        }).catch(err => {
            console.log("Not deleted")
        })
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h2 className='readone'>{itemData.name}</h2>
                    <Image src={`http://localhost:5000/images/${itemData.photo1}`} className='img-fluid readoneimage' style={{width:"400px", marginBottom:"200px", borderRadius:"20px"}} alt="Item"/>
                    <Button variant="primary" type="submit" className='deleteButton' onClick={()=>handleDelete(itemData._id)}>Delete</Button>
                    <Button variant="primary" type="submit" className='updateButton' href={`/updateRent/${itemData.slug}`}>Update</Button>

                </Col>

                
                
            </Row>
        </Container>
    )
}

export default RentReadOne