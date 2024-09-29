import React, { useState, useEffect } from 'react';
import './css/home.css'
import image1 from './images/home2.png'
import image2 from './images/nyc.png'
import { Button, Card, Row, Col, Image, Carousel, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import NewPropertiesProps from './NewPropertiesProps';
import property1 from './images/ap1.jpg'
import property3 from './images/villa.png'
import property4 from './images/bed.png'
import property2 from './images/stairs.png'
import agent1 from './images/unnamed.png'
import HomeCardsProps from './HomeCardsProps';
import TypeProps from './TypeProps'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import review1 from './images/review1.webp';
import review2 from './images/review2.jpeg';
import review3 from './images/review3.jpg';
import review4 from './images/review4.jpg';
import review5 from './images/review5.avif';
import review6 from './images/review6.jpg';
import ReviewProps from './ReviewProps';
import turtlebay from './images/turtlebay.jpg';
import upperwest from './images/upperwest.jpg';
import little from './images/little.jpg';
import villa2 from './images/villa2.jpg'
import penthouse from './images/penthouse.jpg'
import studio from './images/studio.jpg'
import apartment from './images/apartment.jpg'
import house1 from './images/house1.jpg';
import house2 from './images/house2.jpg';
import house3 from './images/house3.jpg';


const Home = () => {

    const properties = [
        {
            slug: 'property1',
            image: house1,
            type: "For sale",
            title: "220 Woodside Drive",
            price: "$7,900,000",
            location: "Hewlett, NY 11557",
            beds: 5,
            baths: 4,
            sqft: 5000,

        },
        {
            slug: 'MULBST',
            image: little,
            type: "For rent",
            title: "MULBERRY STREET",
            price: "$8500/mo",
            location: "Little Italy",
            beds: 4,
            baths: 2,
            sqft: 1100,

        },
        {
            slug: 'property1',
            image: house3,
            type: "For sale",
            title: "E 85 ST #1EF",
            price: "$3,400,000",
            location: "Upper East Side",
            beds: 2,
            baths: 3,
            sqft: 2000,

        },
        {
            slug: 'EAST44',
            image: turtlebay,
            type: "For rent",
            title: "EAST 44TH STREET",
            price: "$7275/mo",
            location: "Turtle Bay",
            beds: 1,
            baths: 1,
            sqft: 900,

        },

        {
            slug: 'property3',
            image: house2,
            type: "For sale",
            title: "60 Lyman PI",
            price: "$4,786,000",
            location: "Staten Island, NY 10304",
            beds: 3,
            baths: 2,
            sqft: 9000

        },
        {
            slug: 'W80STR',
            image: upperwest,
            type: "For rent",
            title: "W 80TH STREET",
            price: "$11,500/mo",
            location: "Upper West Side",
            beds: 1,
            baths: 1.5,
            sqft: 980

        },
       
       
    

    ]

    const agents = [
        {
            slug: 'rent',
            image: property1,
            title: "For rent",
            text: "Let us help you discover the perfect rental property to call home, providing convenience and comfort."
        },

        {
            slug: 'buy',
            image: property3,
            title: "For sale",
            text: "Buying your home is a big financial decision. We'll take care of you throughout the entire process.",


        },
        {
            slug: 'team',
            image: agent1,
            title: "Agents",
            text: "Our agents are your trusted advisors, providing personalized service and expert guidance. ",


        },
    ]

    let types = [

        {
            images: [villa2, penthouse],
            texts: ['Villa', 'Penthouse'],

        },
        {
            images: [studio, apartment],
            texts: ['Studio', 'Apartment'],
        }
    ]

    const reviews = [
        {
            key: 1,
            name: "Jessica Thompson",
            description: "My experience with Everstate Residential was absolutely wonderful. They helped me find my dream home in Tirana, and the entire process was smooth and stress-free. The team was professional, knowledgeable, and always available to answer any questions I had. I highly recommend Everstate Residential to anyone looking to buy a property in Tirana.",
            address: "New York, USA",
            image: review1,
        },
        {
            key: 2,
            name: "David Anderson",
            description: "I recently sold my property through Everstate Residential, and I couldn't be happier with the outcome. Their expertise in the real estate market, strategic pricing, and effective marketing strategies resulted in a quick sale at a great price. The entire team was supportive and communicative throughout the process. Highly recommended!",
            address: "London, UK",
            image: review2,
        },
        {
            key: 3,
            name: "Sophia Johnson",
            description: "As a first-time homebuyer, I was a bit nervous about the whole process, but Everstate Residential made it incredibly easy. They guided me through every step, from finding the right property to closing the deal. Their attention to detail and commitment to customer satisfaction exceeded my expectations. Thank you, Everstate!",
            address: "Los Angeles, USA",
            image: review3,
        },
        {
            key: 4,
            name: "Emily Taylor",
            description: "I had the pleasure of working with Everstate Residential to rent out my property, and it was a fantastic experience. They found reliable tenants quickly and took care of all the paperwork and logistics. Their professionalism and dedication to client satisfaction are commendable. I highly recommend their services.",
            address: "Sydney, Australia",
            image: review4,
        },
        {
            key: 5,
            name: "Michael Brown",
            description: "Everstate Residential helped me invest in a profitable real estate opportunity, and I couldn't be happier with the results. They provided valuable insights, conducted thorough market research, and identified the perfect property for my investment goals. Their expertise and personalized approach are unmatched.",
            address: "Toronto, Canada",
            image: review5,
        },
        {
            key: 6,
            name: "John Smith",
            description: "I recently relocated to Tirana and needed to find a rental property quickly. Everstate Residential was incredibly helpful in finding me the perfect apartment that met all my requirements. Their responsiveness and attention to detail made the entire process seamless. I highly recommend their rental services.",
            address: "Tirana, Albania",
            image: review6,
        },
    ]
    const options = {
        loop: true,
        center: true,
        items: 3,
        margin: 0,
        autoplay: true,
        dots: true,
        autoplayTimeout: 8500,
        smartSpeed: 450,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 3
            }
        }
    };

    return (
        <div>

            <div className='homeMain'>
                <img src={image1} alt="home" className='homeImg' />
                <div className='homeMainText'>

                    <h2 className='homeTitle'>Everstate Residential</h2>
                    <h2 className='homeTitle2'>Tirana Real Estate</h2>
                    <p className='ready'>Crafting Your Perfect Home Story"</p>
                    <Link to="/buy">
                        <Button className='forsale' style={{
                            backgroundColor: 'white',
                            color: 'black',
                            textAlign: 'center',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '5px 10px',
                            fontSize: '20px',
                            fontWeight: 'bold'
                        }} >For Sale</Button>
                    </Link>

                    <Link to="/rent">
                        <Button className='forrent' style={{
                            backgroundColor: 'white',
                            color: 'black',
                            textAlign: 'center',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '5px 10px',
                            fontSize: '20px',
                            fontWeight: 'bold'
                        }} >For Rent</Button>
                    </Link>
                </div>
            </div>

            <div className='homeAbout'>
                <Card className='card cardBorder' >
                    <Row>
                        <Col>
                            <Image src={image2} alt="Description" className='villa' />
                        </Col>

                        <Col>
                            <Card.Body>
                                <div className='homeAboutText'>
                                    <Card.Title id='about'>Meet with Everstate</Card.Title>
                                    <Card.Text id='tradition'>Where Dreams Find Their Address</Card.Text>
                                    <Card.Text id='aboutText'>
                                        Everstate is a premier real estate agency committed to providing unparalleled service and expertise to clients seeking to buy, sell, or invest in properties. With a deep understanding of the local market trends and a commitment to staying ahead of industry developments, we provide valuable insights and strategic advice to help our clients make informed decisions.
                                    </Card.Text>
                                    <Link to="/about">
                                        <Button className='aboutButton' style={{
                                            backgroundColor: 'black',
                                            color: 'white',
                                            textAlign: 'center',
                                            border: '2px solid black',
                                            cursor: 'pointer',
                                            padding: '10px 20px',
                                            fontSize: '16px',

                                        }} >About us</Button>
                                    </Link>

                                </div>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            </div>

            <div className='homeCards'>

                <Row>
                    {agents.map((agent, index) => {
                        return (
                            <Col key={index}>
                                <HomeCardsProps  {...agent} />
                            </Col>
                        )
                    })}
                </Row>
            </div>

            <div className='homeBar'>
                <Container className='BarContainer'>
                    <Row>
                        <Col className='BarItem'>
                            <div>
                                <i className="fa-solid fa-house"></i>
                                <p className='BarP'>+200 properites for sale & rent</p>
                            </div>
                        </Col>

                        <Col className='BarItem'>
                            <div>
                                <i class="fa-regular fa-thumbs-up"></i>
                                <p className='BarP'>+8K happy customers</p>
                            </div>
                        </Col>

                        <Col className='BarItem '>
                            <div>
                                <i class="fa-solid fa-tag"></i>
                                <p className='BarP'>Affordable price guarantee</p>
                            </div>
                        </Col>

                        <Col className='BarItem'>
                            <div>
                                <i class="fa-solid fa-trophy"></i>
                                <p className='BarP'>Highly qualified service</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className='homeProperties'>
                <h2 className='homePropertiesTitle'>Latest Properties</h2>
                <Carousel className='PropertiesCarousel'>
                    {chunkArray(properties, 3).map((chunk, index) => (
                        <Carousel.Item key={index}>
                            <Row className='PropertiesCardsContainer'>
                                {chunk.map((property, index) => (
                                    <Col key={index}>
                                        <NewPropertiesProps {...property} />
                                    </Col>
                                ))}
                            </Row>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>


            <div className='homeTypes'>

                <div className='homeTypesContainer'>
                    {types.map((type, index) => {
                        return (
                            <TypeProps key={index} data={type} />
                        )
                    })}
                </div>

                <div className="galleryFooterSpace"></div>

                <div className="PropertyTypes">
                    <h3 className="propertytypes">Property types</h3>
                </div>

            </div>

            <section id="reviews" className="reviews pt-70 pb-70">
                <div className="container mt-5">
                    <div className="text-center ">
                        <h3 className="homePropertiesTitleR">What Our Clients are Saying?</h3>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <OwlCarousel id="customer-review" className="owl-carousel owl-theme" {...options}>
                                {reviews.map(reviewDetail => (
                                    <ReviewProps key={reviewDetail.key} testiMonialDetail={reviewDetail} />
                                ))}
                            </OwlCarousel>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    )
}

function chunkArray(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
}


export default Home;
