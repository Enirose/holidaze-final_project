import {Container, Nav, Navbar, NavDropdown, Image} from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import "../../styles/custom.scss";
import { load, remove } from '../localStorage';
import { FetchUserProfile } from '../../posts/getProfile';

 export default function NavContainer() {
  const [user, setUser] = useState({
    name:'',
    avatar:''
  })

  const isLoggedIn = !!load('token');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = load('token');
        const userName = load('user');
        const response = await FetchUserProfile(userName, token);

        if (response) {
          setUser(response);
        } else {
          console.error('Error fetching user profile');
        }
      } catch (error) {
        console.error('Error fetching user profile', error);
      }
    };

    fetchUserProfile();
  }, []);


  const handleLogout = () => {
    remove('user');
    remove('token');
    remove('venueData')
  }

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Ho<b><font color='orange'>lidaze</font></b></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/">Venues</Nav.Link>
              {!isLoggedIn && (
                <>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/register">Register</Nav.Link>
                </>
              )}
            </Nav>
            {isLoggedIn && (
              <Nav.Item>
                <Image
                  src={user.avatar} 
                  roundedCircle
                  width={50}
                  height={50}
                  className="m-1"
                  alt="User Image"
                />
              </Nav.Item>
            )}
            {isLoggedIn && (
              <NavDropdown title={user.name}  id="basic-nav-dropdown" className="custom-dropdown">
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href='/' onClick={handleLogout}>Logout </NavDropdown.Item>
              </NavDropdown>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
