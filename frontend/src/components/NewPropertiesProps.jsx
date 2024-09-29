import { Card, Button, CardText } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './css/home.css';
import React, { useState, useEffect, useRef } from 'react';




const NewPropertiesProps = ({ image, type, title, location, price, beds, baths, sqft, slug }) => {
    return (
        <div className="propertiesCardWrapper">
            <Card className='propertiesCard'>
                <div className="propertyTypeWrapper">
                    <span className="propertyType">{type}</span>
                </div>
                <Card.Img variant="top" src={image}/>
                <Card.Body>
                    <CardText>
                        <p className="PropertiesLocation">{location}</p>
                    </CardText>
                    <Card.Title className='PropertiesTitle'>{title}</Card.Title>
                    <Card.Text>
                        <h4 className='PropertiesPrice'>{price}</h4>
                        <i className="fa-solid fa-bed"></i> Beds({beds})
                        <i className="fa-solid fa-bath ms-2"></i> Baths({baths})
                        <i className="fa-solid fa-up-right-and-down-left-from-center  ms-2"></i> sqft({sqft})
                    </Card.Text>
                    <Link to={`/property/${slug}`}>
                        <Button className='aboutButton' style={{
                            backgroundColor: 'black',
                            color: 'white',
                            textAlign: 'center',
                            border: '2px solid black',
                            cursor: 'pointer',
                            padding: '10px 20px',
                            fontSize: '16px',

                        }} >Read more</Button>
                    </Link>
                </Card.Body>
            </Card>
        </div>

        
    );
};



export default NewPropertiesProps;