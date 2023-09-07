import {Container, Nav, Navbar, NavDropdown, Image} from 'react-bootstrap';
import React from 'react';
import "../../styles/custom.scss";

 export default function NavContainer() {
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Venues</Nav.Link>
            </Nav>
            <Nav.Item>
                <Image
                  src="https://www.almanac.com/sites/default/files/styles/or/public/image_nodes/rose-peach.jpg?itok=Y_6bVHKW" // Replace with your profile image URL
                  roundedCircle
                  width={32}
                  height={32}
                  alt="Profile"
                />
              </Nav.Item>
            <NavDropdown title="User Profile" id="basic-nav-dropdown" className="custom-dropdown"> 
                <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#">Logout</NavDropdown.Item>
              </NavDropdown>
              
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
