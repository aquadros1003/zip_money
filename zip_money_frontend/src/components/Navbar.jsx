import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Button } from "antd";
import Logo from "../assets/logo.png";

function Navigation() {
  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <a>
            <img
              className="img-fluid"
              src={Logo}
              alt=""
              width={60}
              height={60}
            />
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#pricing">App Features</Nav.Link>
            <Nav.Link href="#pricing">About us</Nav.Link>
            <Nav.Link href="#pricing">Contact us</Nav.Link>
          </Nav>
          <div className="d-md-block">
            <Button className="square-button" href="/login">
              Sign In
            </Button>
            <Button type="primary" className="square-button" href="/register">
              Sign Up
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
