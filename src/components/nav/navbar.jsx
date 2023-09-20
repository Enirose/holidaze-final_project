import {Container, Nav, Navbar, NavDropdown, Image} from 'react-bootstrap';
import React from 'react';
import "../../styles/custom.scss";
import { load, remove } from '../localStorage';

 export default function NavContainer() {

  const isLoggedIn = !!load('token');

  const handleLogout = () => {
    remove('user');
    remove('token');
  }

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
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
                  src="https://www.almanac.com/sites/default/files/styles/or/public/image_nodes/rose-peach.jpg?itok=Y_6bVHKW" // Replace with your profile image URL
                  roundedCircle
                  width={32}
                  height={32}
                  alt="User Image"
                />
              </Nav.Item>
            )}
            {isLoggedIn && (
              <NavDropdown title="User Profile" id="basic-nav-dropdown" className="custom-dropdown">
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
