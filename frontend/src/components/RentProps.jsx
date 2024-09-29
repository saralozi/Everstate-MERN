import React, { useState } from 'react';
import { Card, Button, CardText } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './css/rent.css';
const formatPriceWithCommas = (price) => {
  console.log("Formatting price:", price);
  return price.toLocaleString();
};



const RentProps = ({ title, location, price, beds, baths, sqft, _id, isAdmin, slug, photo1 }) => {
  const [isHeartClicked, setIsHeartClicked] = useState(false);

  const handleHeartClick = () => {
    setIsHeartClicked(!isHeartClicked);
  };



  return (
    <Card className='rentCard'>
      <Link to={`/rentDetail/${slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Card.Img variant='top' className='rentImage' src={`http://localhost:5000/images/${photo1}`} />
      </Link>
      <div className="heart" onClick={handleHeartClick}>
        {isHeartClicked ? <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}
      </div>
      <Card.Body>
        <CardText>
          <p className="rentLocation">{location}</p>
        </CardText>
        <Card.Title className='rentTitle'>{title}</Card.Title>
        <Card.Text>
          <h4 className='rentalsPrice'> <span className='from'>from</span> ${formatPriceWithCommas(price)}<span className='from'>/month</span></h4>
          <i className="fa-solid fa-bed"></i> Beds({beds})
          <i className="fa-solid fa-bath ms-2"></i> Baths({baths})
          <i className="fa-solid fa-up-right-and-down-left-from-center  ms-2"></i> sqft({sqft})
        </Card.Text>
        {isAdmin && (
          <Button variant="primary" type="submit" className='editButton' href={`/readOneRent/${slug}`}>
            Edit
          </Button>
        )}
        <Button variant="primary" type="submit" className='readmoreButton' href={`/rentDetail/${slug}`}>
          Read more
        </Button>
      </Card.Body>
    </Card>
  );
};

export default RentProps;