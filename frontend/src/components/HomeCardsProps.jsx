import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './css/home.css';

const HomeCardsProps = ({ title, image, text, slug }) => {
    return (
        <div>
            <Card className='homeCardscard'>
                <Card.Title className='homeCardsTitle'>{title}</Card.Title>
                <Link to={`${slug}`}><Card.Img variant="top" src={image} /></Link>
                <Card.Body className='homeCardsBody'>
                    <p>{text}</p>
                </Card.Body>
            </Card>
        </div>
    );
};

export default HomeCardsProps;
