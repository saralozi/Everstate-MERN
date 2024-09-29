import React, { useContext, useEffect } from 'react';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './css/navigation.css';
import { UserContext } from './UserContext';
import axios from 'axios'
const Navigation = () => {
  const { userInfo, setUserInfo, setIsAdmin, setIsLoggedIn } = useContext(UserContext);
useEffect(()=>{
if(!userInfo.email){
  axios.get('http:localhost:5000/user', {withCredencials:true})
  .then(res => {
    setUserInfo(res.data)
    setIsAdmin(true)
    setIsLoggedIn(true)
    console.log("user"+ res.data)
  }).catch(err => {
    console.log("Not login "+err)
  })
}
}, [userInfo])

  // const handleLogout = () => {
  //   setUserInfo({ name: "", email: "", role: "" });
  //   setIsLoggedIn(false);
  //   setIsAdmin(false);
  // };
  const handleLogout = () => {
    axios.post('https://localhost:5000/logout', null, {withCredentials:true})
    .then(res=>{
      setUserInfo({});
      setIsAdmin(false)
      setIsLoggedIn(false)
      // setIsLoggedIn(false);
      // setIsAdmin(false);
    }).catch(err=>{
      console.log("User not logout "+err)
    })
    
  };
  return (
    <div className="navbar-container">
      <Navbar expand="lg" className="navbar bg-white ">
        <Container>
          <Navbar.Brand as={Link} to="/" className="brand">Everstate</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="items custom-margin" style={{ marginLeft: 'auto' }}>
              <Nav.Link as={Link} to="/" className="nav-item item">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/about" className="nav-item item">
                About
              </Nav.Link>
              <NavDropdown title="Properties" id="basic-nav-dropdown" className="nav-item item">
                <NavDropdown.Item href="#action/3.1" as={Link} to="/buy" className="nav-item item">Buy</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3" as={Link} to="/rent" className="nav-item item">Rent</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/team" className="nav-item item">
                Team
              </Nav.Link>
              <Nav.Link as={Link} to="/contact" className="nav-item item">
                Contact
              </Nav.Link>
              {userInfo && userInfo.name ? (
                <>
                  <Nav.Link className="nav-item item welcome">
                    Welcome, {userInfo.name}
                  </Nav.Link>
                  <Nav.Link className="nav-item item">
                    <Button
                      className="aboutButton signup-login-space logout"
                      onClick={handleLogout}
                      style={{
                        backgroundColor: 'black',
                        color: 'white',
                        textAlign: 'center',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '5px 10px',
                        fontSize: '16px',
                      }}
                    >
                      Logout
                    </Button>
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Link to="/signup">
                    <Button className='aboutButton' style={{
                      backgroundColor: 'black',
                      color: 'white',
                      textAlign: 'center',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '5px 10px',
                      fontSize: '16px',
                    }}>Signup</Button>
                  </Link>
                  <Link to="/login">
                    <Button className='aboutButton signup-login-space' style={{
                      backgroundColor: 'black',
                      color: 'white',
                      textAlign: 'center',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '5px 10px',
                      fontSize: '16px',
                    }}>Login</Button>
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
