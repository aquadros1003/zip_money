import React from "react";
import { Card, Row, Col, Button } from "antd";
import Logo from "../assets/logo.png";
import backgroundImage from "../assets/background.jpg";
import Navigation from "../components/Navbar";
import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import ACTIVATE from "../api/mutations/Activate";
import { Spin } from "antd";

const Activation = () => {
  const { uid, token } = useParams();
  const [activate, { data, loading, error }] = useMutation(ACTIVATE);

  React.useEffect(() => {
    activate({ variables: { uidb64: uid, token: token } });
  }, [activate, token, uid]);

  return (
    <>
      <Navigation />
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "91.1vh",
        }}
      >
        <Row justify="center" align="middle" style={{ height: "100%" }}>
          <Col>
            <Card
              style={{
                width: 300,
                textAlign: "center",
                borderRadius: 20,
                backgroundColor: "#ffffff",
                opacity: 0.9,
              }}
            >
              <img src={Logo} alt="Zip Money" width="200" />
              <p>
                {loading ? (
                  <Spin />
                ) : error ? (
                  "Something went wrong"
                ) : data?.activate?.success ? (
                  <div style={{ color: "green" }}>
                    Your account has been activated successfully
                    <br />
                    <Button
                      type="primary"
                      href="/login"
                      style={{
                        marginTop: 10,
                        borderRadius: 10,
                        width: 100,
                        height: 40,
                      }}
                    >
                      Login
                    </Button>
                  </div>
                ) : (
                  "Something went wrong"
                )}
              </p>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Activation;
