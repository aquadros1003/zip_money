import React from "react";
import LoginForm from "../components/LoginForm";
import { Card, Row, Col } from "antd";
import Logo from "../assets/logo.png";
import backgroundImage from "../assets/background.jpg";
import Navigation from "../components/Navbar";

const Login = (props) => {
  return (
	<>
		<Navigation />
		<div
		style={{
			backgroundImage: `url(${backgroundImage})`,
			backgroundRepeat: "no-repeat",
			backgroundSize: "cover",
		}}
		>
		<div className="container py-4">
			<Row justify="center">
			<Col xs={50} sm={30} md={30} lg={12}>
				<Card>
				<div className="my-4">
					<div className="text-center">
					<img
						className="img-fluid"
						src={Logo}
						alt=""
						width={158.4}
						height={158.4}
					/>
					<p>
						Don't have an account yet? <a href="/register">Sign Up</a>
					</p>
					</div>
					<Row justify="center">
					<Col xs={24} sm={30} md={30} lg={20}>
						<LoginForm {...props} />
					</Col>
					</Row>
				</div>
				</Card>
			</Col>
			</Row>
		</div>
		</div>
	</>
  );
};

export default Login;
