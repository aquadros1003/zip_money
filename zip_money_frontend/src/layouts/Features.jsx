import React, { useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Row, Col } from "react-bootstrap";
import ExpenseImage from "../assets/expense.jpg";
import BudgetImage from "../assets/budget.jpg";
import MobilityImage from "../assets/mobility.jpg";

const Features = () => {
    const aboutUsRef = useRef(null);
    return (
        <section className="features" ref={aboutUsRef}>
            <Container>
                <h1>App Features</h1>
                <Row className="feature-row">
                    <Col md={4}>
                        <div className="feature">
                            <i className="fas fa-chart-pie feature-icon"></i>
                            <a><img src={ExpenseImage} alt="" className="img-fluid feature-img"/></a>
                            <h2>Expense analysis</h2>
                            <p>
                                Track your spending, categories, and trends with charts.
                            </p>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="feature">
                            <i className="fas fa-wallet feature-icon"></i>
                            <a><img src={BudgetImage} alt="" className="img-fluid feature-img"/></a>
                            <h2>Budget planning</h2>
                            <p>Set savings goals and monitor your progress.</p>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="feature">
                            <i className="fas fa-mobile-alt feature-icon"></i>
                            <a><img src={MobilityImage} alt="" className="img-fluid feature-img"/></a>
                            <h2>Mobility</h2>
                            <p>
                                Access Your Budget From Any Device
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default Features;