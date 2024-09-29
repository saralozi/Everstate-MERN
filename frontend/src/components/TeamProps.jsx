import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './css/team.css';

const TeamProps = ({ name, photo, email, phone, _id, isAdmin }) => {
    return (
        <div className='teamProps'>
            <Card style={{ width: '22rem', border: 'none', position: 'relative' }} className='agentCard'>
                <div className="imageOverlay">
                    <p className="imageText"><i class="fa-regular fa-envelope"></i>{email}</p>
                    <p className="imageText"><i class="fa-solid fa-phone"></i>{phone}</p>
                </div>
                <Card.Img variant='top' className='agentImage' src={`http://localhost:5000/images/${photo}`} />
                <Card.Body>
                    <Card.Title className='agentCardTitle'>{name}</Card.Title>
                    {isAdmin && (
                        <Button variant="primary" type="submit" className='editButton' href={`/readOne/${_id}`}>
                            Edit
                        </Button>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

export default TeamProps;
