import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Row, Col } from "react-bootstrap";
import HeroImage from "../assets/hero.jpg";

const Hero = () => {
  return (
      <section className="hero d-flex align-items-center justify-content-center">
        <Container>
          <Row>
            <Col md={6} className="d-flex align-items-center">
              <div className="hero-text">
                <h1>Track Your Spending and Savings</h1>
                <p>Manage your budget in a simple and efficient way.</p>
                <button className="hero-button" role="button">Get Started</button>
              </div>
            </Col>
            <Col md={6}>
              <div className="hero-image">
                <img src={HeroImage} alt="" className="img-fluid hero-img"/>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
  );
};

export default Hero;