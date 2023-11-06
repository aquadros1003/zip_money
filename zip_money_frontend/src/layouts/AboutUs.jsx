import React, {useRef} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import AboutUsImage from "../assets/aboutus.webp";

const AboutUs = () => {
  const AboutUsRef = useRef(null);
  console.log(AboutUsRef);
  return (
    <section className="aboutus d-flex align-items-center justify-content-center" ref={AboutUsRef}>
      <Container>
        <Row>
          <Col md={6}>
            <div className="hero-image">
              <img src={AboutUsImage} alt="" className="img-fluid hero-img" />
            </div>
          </Col>
          <Col md={6} className="d-flex align-items-center">
            <div className="about-text">
              <h3>About Us</h3>
              <p>
                Meet the dedicated team at ZipMoney. We are a group of financial
                experts, software engineers, and designers, all passionate about
                simplifying budget management for you.
              </p>
              <p>
                Our diverse team combines years of experience to provide you
                with a user-friendly and powerful budget management app. We are
                here to help you take control of your finances and achieve your
                financial goals.
              </p>
              <p>
                Join us on your financial journey with ZipMoney and start
                building a secure and prosperous future.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutUs;
