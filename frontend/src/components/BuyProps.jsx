import React from 'react';
import { Card, Button, CardText } from 'react-bootstrap';
import './css/buy.css';

const formatPriceWithCommas = (price) => {
  return price.toLocaleString();
};

const BuyProps = ({ slug, photo, title, location, price, beds, baths, sqft, isAdmin }) => {
  return (
    <Card className='salesCard'>
      <Card.Img variant='top' className='salesImage' src={`http://localhost:5000/images/${photo}`} />
      <div className="heart">
        <i className="fa-regular fa-heart"></i>
      </div>
      <Card.Body>
        <CardText>
          <p className="salesLocation">{location}</p>
        </CardText>
        <Card.Title className='buyTitle'>{title}</Card.Title>
        <Card.Text>
          <h4 className='salesPrice'> <span className='from'>from</span> ${formatPriceWithCommas(price)}</h4>
          <i className="fa-solid fa-bed"></i> Beds({beds})
          <i className="fa-solid fa-bath ms-2"></i> Baths({baths})
          <i className="fa-solid fa-up-right-and-down-left-from-center  ms-2"></i> sqft({sqft})
        </Card.Text>
        {isAdmin && (
          <Button variant="primary" type="submit" className='editButton' href={`/buyreadOne/${slug}`}>
            Edit
          </Button>
        )}
        <Button variant="primary" type="submit" className='readmoreButton' href={`/readmorebuy/${slug}`}>
          Read more
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BuyProps;