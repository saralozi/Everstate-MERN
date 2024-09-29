import React, { useState, useEffect } from 'react';
import { Container, Carousel, Button } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './css/rentdetail.css';

const RentDetail = () => {
  const { slug } = useParams();
  const [itemData, setItemData] = useState({});
  const [showFullDescription, setShowFullDescription] = useState(false);


  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/readOneRent/${slug}`);
        setItemData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [slug]);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div>
      <Container>
        <div className='detailCont1'>
          <Carousel className='rentCarousel'>
            <Carousel.Item>
              <div className='rentCarouselComponent'>
                <img className='rentCarouselImage' src={`http://localhost:5000/images/${itemData.photo1}`} alt="First slide" />
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className='rentCarouselComponent'>
                <img className='rentCarouselImage' src={`http://localhost:5000/images/${itemData.photo2}`} alt="Second slide" />
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className='rentCarouselComponent'>
                <img className='rentCarouselImage' src={`http://localhost:5000/images/${itemData.photo3}`} alt="Third slide" />
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className='rentCarouselComponent'>
                <img className='rentCarouselImage' src={`http://localhost:5000/images/${itemData.photo4}`} alt="Fourth slide" />
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className='rentCarouselComponent'>
                <img className='rentCarouselImage' src={`http://localhost:5000/images/${itemData.photo5}`} alt="Fifth slide" />
              </div>
            </Carousel.Item>
          </Carousel>

          <div className='detailCont2'>
            <div className='detailCont2Row'>
              <div className='detailCont2Left'>
                <h3 className='detailLocation'><i className="fa-solid fa-location-dot locationIcon"></i>{itemData.location}</h3>
                <h2 className='detailTitle'>{itemData.title}</h2>
              </div>
              <div className='detailCont2Right'>
                <h3 className='priceCont'>from ${itemData.price}/month</h3>
                <h4 className='agentCont'><i className="fa-solid fa-briefcase agentIcon"></i>{itemData.agent}</h4>
                <Button variant='primary' type='submit' className='editButton' href={`/contact`}>
                  Schedule meeting
                </Button>
              </div>
            </div>
            <div className='bedsCont'>
              <p><i className="fa-solid fa-bed bedsIcon"></i>({itemData.beds})<i className="fa-solid fa-bath bedsIcon"></i>({itemData.baths})
              <i className="fa-solid fa-up-right-and-down-left-from-center bedsIcon"></i>{itemData.sqft} ft²</p>
            </div>
          </div>
        </div>

        <div className='detailCont3'>
          <div className='descriptionCont'>
            <h2 className='descriptionTitle'>Description</h2>
            <p className='descriptionText'>
              {itemData.description ? (showFullDescription ? itemData.description : `${itemData.description.slice(0, 300)}...`) : ''}
            </p>
            {itemData.description && itemData.description.length > 300 && (
              <Button variant='primary'  className='editButton'  onClick={toggleDescription}>
                {showFullDescription ? 'Read Less' : 'Read More'}
              </Button>
            )}
          </div>

          <div className='amenitiesCont'>
            <h2 className='descriptionTitle'>Amenities</h2>
            <p>{itemData.building}</p>
            <p>{itemData.apartment}</p>
          </div>
        </div>

      </Container>
    </div>
  );
}

export default RentDetail;
