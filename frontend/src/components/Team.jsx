import React, { useState, useEffect, useContext } from 'react'
import { Card, Container, Row, Col, Button, Image } from 'react-bootstrap'
import team from './images/team.jpeg'
import team2 from './images/team2.jpeg'
import './css/team.css'
import { Link } from 'react-router-dom';
import TeamProps from './TeamProps'
import axios from 'axios';
import { UserContext } from './UserContext';
import teamwork from './images/teamwork.jpg'


const Team = () => {

  const [allData, setAllData] = useState([]);
  const [userRole, setUserRole] = useState("");
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

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/team');
        setAllData(response.data);
      } catch (error) {
        console.log("Data not showing. " + error);
      }
    };

    fetchUserRole();
    fetchData();
  }, []);

  console.log("User role:", userRole);


  return (
    <div>
      <div className='teamBanner'>
        <Container fluid className='team-card'>
          <Row className='teamRow'>
            <Col className='teamText'>
              <Card.Body>
                <Card.Title className='teamTitle'>Meet with Everstate team</Card.Title>
                <Card.Text className='teamSubtitle'>
                  "Teamwork makes the dream work." - John C. Maxwell
                </Card.Text>
              </Card.Body>
            </Col>
            <Col style={{ padding: 0 }}>
              <Card.Img variant="top" className='teamImage' src={team} />
            </Col>
          </Row>
        </Container>
      </div>

      <div className='teamAbout'>
        <Card>
          <Row>
            <Col>
              <Image src={team2} alt="Description" className='teamImage2' />
            </Col>
            <Col>
              <Card.Body>
                <div className='teamAboutText'>
                  <Card.Text id='TeamAboutText1'>
                    Here, you'll meet the passionate individuals behind our success, dedicated to providing exceptional service in every transaction.
                    Our team is comprised of experienced real estate professionals with diverse backgrounds and expertise, united by a shared commitment to integrity, professionalism, and client satisfaction.
                  </Card.Text>
                  <Card.Text id='TeamAboutText2'>
                    From seasoned agents with extensive market knowledge to innovative marketers and diligent administrators, each member plays a vital role in delivering unparalleled results for our clients.
                    Get to know the faces behind the name and discover why our team is your trusted partner.
                  </Card.Text>
                </div>
              </Card.Body>
            </Col>
            <Col>
              <Image src={teamwork} alt="Description" className='teamImage3' />
            </Col>
          </Row>
        </Card>
      </div>

      <div className='teamAgents'>

        <h1 className='teamAgentTitle'>Agents</h1>
        {userRole === 'admin' && (
          <Link to="/add">
            <Button variant="primary" type="submit" className='destinationButton add agent'>
              Add agent
            </Button>
          </Link>
        )}

        <Container className='agentContainer'>
          {allData.map((item, index) => {
            if (index % 4 === 0) {
              return (
                <Row key={index}>
                  {[0, 1, 2, 3].map((innerIndex) => {
                    const dataIndex = index + innerIndex;
                    if (dataIndex < allData.length) {
                      return (
                        <Col key={dataIndex} xs={12} md={6} lg={3}>
                          <TeamProps {...allData[dataIndex]} isAdmin={userRole === 'admin'} />
                        </Col>
                      );
                    } else {
                      return null;
                    }
                  })}
                </Row>
              );
            } else {
              return null;
            }
          })}
        </Container>

      </div>

    </div >
  )
}

export default Team