import React, { useEffect } from 'react'
import { Card, Col, Row, Image } from 'react-bootstrap'
import about from './images/about.jpg'
import './css/about.css';
import office1 from './images/office1.jpg';
import office5 from './images/office5.jpg';
import office4 from './images/office4.jpg';
import ny1 from './images/ny1.jpeg';
import ny2 from './images/ny2.jpeg';
import ny3 from './images/ny3.jpeg';
import ny4 from './images/ny4.png';
import ny5 from './images/ny5.png';




const About = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className='aboutMain'>
        <img src={ny3} alt="home" className='aboutImg' />
        <p className='aboutTitle'>About us</p>
        <p className='aboutSubtitle'>Turning dreams into addresses</p>
      </div>

      <div className='aboutCard'>
        <Card>
          <Row>
            <Col className='imgAboutdiv'>
              <Image src={office1} alt="Description" className='aboutCardImage' />
            </Col>
            <Col>
              <Card.Body>
                <div className='aboutText'>
                  <Card.Text id='aboutText'>
                  Welcome to Everstate, a distinguished realm where we proudly revolutionize the landscape of real estate, infusing it with a harmonious fusion of unparalleled expertise, unwavering integrity, and bespoke, personalized service. 
                  Embarking on our odyssey with a visionary zeal, we set out to reshape the very essence of how individuals engage in the dynamic realms of property acquisition, sales, and investment. 
                  From our humble beginnings, we have remained resolute in our dedication to exceeding expectations and crafting extraordinary outcomes for our esteemed clientele. 
                  Through every transaction, we strive not merely to meet but to surpass the conventional norms, establishing Everstate as the quintessential beacon of excellence within the ever-evolving realm of real estate.    
                  </Card.Text>           
                  </div>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </div>

      <div className='aboutCard'>
        <Card>
          <Row>
            <Col>
              <Card.Body>
                <div className='aboutText2'>
                  <Card.Text id='aboutText2'>
                  At Everstate, we pride ourselves on our profound recognition that every real estate endeavor is imbued with its own distinctive character and intrinsic significance. 
                  Recognizing the deeply personal nature of each transaction, we prioritize the art of attentive listening and thorough comprehension to discern your individual aspirations, preferences, and objectives. 
                  Whether embarking on the quest for your ideal abode, contemplating the strategic divestment of your property, or delving into the realm of lucrative investment opportunities, our seasoned team of devoted professionals stands ready to accompany you on your journey, offering not only their wealth of expertise but also their unwavering commitment to your well-being and success. 
                  </Card.Text>
                </div>
              </Card.Body>
            </Col>
            <Col className='imgAboutdiv'>
              <Image src={office5} alt="Description" className='aboutCardImage2' />
            </Col>
          </Row>
        </Card>
      </div>

      <div className='aboutCard last'>
        <Card>
          <Row>
          <Col className='imgAboutdiv'>
              <Image src={office4} alt="Description" className='aboutCardImage' />
            </Col>
            <Col>
              <Card.Body>
                <div className='aboutText'>
                  <Card.Text id='aboutText'>
                  At Everstate, our ethos is rooted deeply in the values of honesty, transparency, and innovation, which serve as the cornerstone of our commitment to excellence. 
                  With an unwavering dedication to surpassing your expectations, we endeavor to not only facilitate but elevate your real estate journey, ensuring it unfolds with the utmost smoothness and rewards. 
                  We embrace the forefront of progress, harnessing cutting-edge technology to augment our services and streamline your experience. 
                  Yet, our approach extends far beyond mere technological prowess; it's about understanding the nuances of your unique circumstances and crafting bespoke solutions that resonate with your distinct requirements. 
                  </Card.Text>
                </div>
              </Card.Body>
            </Col>
            
          </Row>
        </Card>
      </div>



    </div>
  )
}

export default About