import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RentProps from './RentProps';
import axios from 'axios';
import { UserContext } from './UserContext';
import './css/rent.css';

const Rent = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [beds, setBeds] = useState('');
  const [baths, setBaths] = useState('');
  const [sqft, setSqft] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState('');
  // eslint-disable-next-line
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user', { withCredentials: true });
        setUserRole(response.data.role);
      } catch (error) {
        console.log("Error fetching user role:", error);
      }
    };

    fetchUserRole();
  }, []);

  useEffect(() => {
    handleSearch(); // eslint-disable-next-line
  }, [title, price, location, beds, baths, sqft]);

  const handleSearch = async () => {
    try {
      const response = await axios.get("http://localhost:5000/searchrent", {
        params: {
          title,
          price,
          location,
          beds,
          baths,
          sqft
        }
      });
      setSearchResults(response.data);
      setError(null);
    } catch (error) {
      setError(error);
      console.error('Error searching:', error);
    }
  };

  const handlePriceChange = (e) => {
    const inputPrice = e.target.value;
    const formattedPrice = inputPrice.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setPrice(formattedPrice);
};

  return (
    <div>
      <div className='rentals'>
        <h1 className='rentalsTitle'>Rentals</h1>
        <hr className='rentalLine'></hr>
        <div className='rentDiv'>
          <p className='rentParagraph'>Looking for your next home sweet home?
            Explore our wide range rent properties tailored to fit your lifestyle and preferences. From cozy apartments to spacious houses, we have a diverse selection of rental options in sought-after neighborhoods.
            Experience convenience, comfort, and quality living with our meticulously maintained properties.
            Begin your search today and find the perfect rental that feels like home.
          </p>
        </div>
        {userRole === 'admin' && (
          <Link to="/addRent">
            <Button variant="primary" type="submit" className='propertyButton add'>
              Add property
            </Button>
          </Link>
        )}
        <Container className='rentalsContainer'>
          <input
            className="input-field"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Search for properties..."
          />
          <input
            className="input-field"
            type="text"
            value={price}
            onChange={handlePriceChange}
            placeholder="Price"
          />
          <input
            className="input-field"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
          />
          <input
            className="input-field1"
            type="number"
            value={beds}
            onChange={(e) => setBeds(e.target.value)}
            placeholder={`\u{1F6CF} Beds`}
            style={{ filter: 'grayscale(100%)' }}
          />
          <input
            className="input-field1"
            type="number"
            value={baths}
            onChange={(e) => setBaths(e.target.value)}
            placeholder={`\u{1F6C0} Baths`}
            style={{ filter: 'grayscale(100%)' }}
          />
          <input
            className="input-field1"
            type="number"
            value={sqft}
            onChange={(e) => setSqft(e.target.value)}
            placeholder={`\u{1F858} Square Feet`}
          />
          <button className="button" onClick={handleSearch}>Search</button>
          {error && <div>Error searching: {error.message}</div>}
          
          <Row className='rentRow'>
            {searchResults.map((item, index) => (
              <Col key={index} xs={12} md={6} lg={3}>
                <RentProps
                  key={item._id}
                  title={item.title}
                  location={item.location}
                  price={item.price}
                  beds={item.beds}
                  baths={item.baths}
                  sqft={item.sqft}
                  isAdmin={userRole === 'admin'}
                  slug={item.slug}
                  photo1={item.photo1}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default Rent;
