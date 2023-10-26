import React from 'react'
import RegisterForm from "../components/RegisterForm";
import { Card, Row, Col } from "antd";
import Logo from '../assets/logo.png';
import backgroundImage from '../assets/background.jpg';

const Register = props => {
	return (
		<div className="h-100" style={{backgroundImage: `url(${backgroundImage})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
			<div className="container d-flex flex-column justify-content-center h-100">
				<Row justify="center">
                    <Col xs={50} sm={30} md={30} lg={12}>
						<Card>
							<div className="my-2">
								<div className="text-center">
                                <a href="/login"><img className="img-fluid" src={Logo} alt="" width={158.4} height={158.4} /></a>
								</div>
								<Row justify="center">
									<Col xs={24} sm={24} md={20} lg={20}>
										<RegisterForm {...props}/>
									</Col>
								</Row>
							</div>
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	)
}

export default Register