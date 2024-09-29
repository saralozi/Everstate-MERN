import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import BuyProps from './BuyProps';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './css/search.css';
import { UserContext } from './UserContext';

const Search = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [beds, setBeds] = useState('');
    const [baths, setBaths] = useState('');
    const [sqft, setSqft] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // eslint-disable-next-line
    const { userInfo } = useContext(UserContext);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const response = await axios.get('http://localhost:5000/user', { withCredentials: true });
                setIsAdmin(response.data.role === 'admin');
                setIsLoggedIn(true); // Set isLoggedIn to true when the user is logged in
            } catch (error) {
                console.log("Error fetching user role:", error);
            }
        };

        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/buy');
                setSearchResults(response.data);
                console.log(response)
            } catch (error) {
                console.log("Data not showing. " + error);
            }
        };

        // fetchUserRole();
        fetchData();
    }, []);

    useEffect(() => {
        handleSearch(); // eslint-disable-next-line
    }, [title, price, location, beds, baths, sqft]);

    const handleSearch = async () => {
        try {
            const response = await axios.get("http://localhost:5000/search", {
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
    console.log(userInfo)
    console.log("isLoggedIn:", isLoggedIn);
    console.log("isAdmin:", isAdmin);
    return (
        <div>
            <div className='sales'>
                <h1 className='salesTitle'>Sales</h1>
                <hr className='salesLine'></hr>
                <div className='saleDiv'>
                    <p className='salesParagraph'>Looking for your next home sweet home?
                        Whether you're looking for a cozy starter home, a luxurious estate, or an investment opportunity, we have a diverse portfolio of properties to explore. From picturesque suburban neighborhoods to bustling urban hotspots, we offer a wide range of options to suit every lifestyle. Let us guide you on your journey to homeownership and turn your dream of owning a home into reality with "Everstate"
                    </p>
                </div>
                

                {isLoggedIn && isAdmin && (
                    <Link to="/addbuy">
                        <Button variant="primary" type="submit" className='propertyButton add'>
                            Add property
                        </Button>
                    </Link>
                )}
            </div>
            <div className="SearchBuyContainer">
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
                <div className="buy-card-container">
                    {searchResults.map(buy => (
                        <BuyProps
                            key={buy._id}
                            isAdmin={isAdmin}
                            slug={buy.slug}
                            photo={buy.photo}
                            location={buy.location}
                            price={buy.price}
                            beds={buy.beds}
                            baths={buy.baths}
                            sqft={buy.sqft}
                            title={buy.title}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Search;
