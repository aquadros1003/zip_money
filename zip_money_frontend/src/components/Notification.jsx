import React from "react";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Button } from "antd";
import ACCEPT_BUDGET from "../api/mutations/AcceptBudget";
import REJECT_BUDGET from "../api/mutations/RejectBudget";
import { Col } from "antd";
import { Row } from "antd";
import GET_INVITATIONS from "../api/queries/GetInvitations";

export const Notification = (budget) => {
  const [acceptBudget, { loading }] = useMutation(ACCEPT_BUDGET, {
    refetchQueries: () => [
      {
        query: GET_INVITATIONS,
      },
    ],
    onCompleted: () => {
      setIsAccepted(true);
    },
  });
  const [rejectBudget, { loading: loadingReject }] = useMutation(
    REJECT_BUDGET,
    {
      refetchQueries: () => [
        {
          query: GET_INVITATIONS,
        },
      ],
      onCompleted: () => {
        setIsRejected(true);
      },
    }
  );
  const [isAccepted, setIsAccepted] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  console.log(budget);
  const handleAccept = () => {
    acceptBudget({
      variables: {
        budgetId: budget.budget.budget.id,
      },
    });
    setIsAccepted(true);
    setIsRejected(true);
  };
  const handleReject = () => {
    rejectBudget({
      variables: {
        budgetId: budget.budget.budget.id,
      },
    });
    setIsAccepted(true);
    setIsRejected(true);
  };
  return (
    <div className="card">
      <div className="card-body">
        <Row>
          <Col xl={18} lg={18} md={18} sm={18} xs={18}>
            <h5 className="card-title">{budget?.budget?.budget?.name}</h5>
            <p className="card-text">{budget?.budget.budget.description}</p>
            <p className="card-text">
              {budget?.budget.budget.budget}{" "}
              {budget?.budget.budget.currency.symbol}
            </p>
            <p className="card-text">{budget?.budget.budget.endDate}</p>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button
              type="primary"
              className="mr-2"
              onClick={handleAccept}
              disabled={isAccepted}
              loading={loading}
            >
              Accept
            </Button>
            <Button
              type="primary"
              danger
              onClick={handleReject}
              disabled={isRejected}
              loading={loadingReject}
            >
              Reject
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Notification;
