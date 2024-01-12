import React from "react";
import { Modal } from "antd";
import { useState } from "react";
import { Col } from "antd";
import { Row } from "antd";
import { Progress } from "antd";
import ParticipantCard from "./ParticipantCard";

const twoColors = {
  "0%": "#108ee9",
  "100%": "#87d068",
};

export const BudgetDetails = (budget, modal2Open, setModal2Open) => {
  const participants = budget.budget.node.budget.assignedUsers.edges.map(
    (participant) => ({
      firstName: participant.node.user.firstName,
      lastName: participant.node.user.lastName,
      avatar: participant.node.user.avatar,
      isOwner: participant.node.isOwner,
    })
  );

  return (
    <Modal
      title={budget.budget.node.budget.name}
      centered
      visible={budget.isDetailsModalVisible}
      footer={null}
      onCancel={() => budget.setIsDetailsModalVisible(false)}
      width={600}
    >
      <Row>
        <Col span={16}>
          <Row>
            <Col span={8}>
              <p>Start Date:</p>
              <p>{budget.budget.node.budget.startDate.split("T")[0]}</p>
            </Col>
            <Col span={12}>
              <p>End Date:</p>
              <p>{budget.budget.node.budget.endDate}</p>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <p>Amount</p>
            </Col>
            <Col span={12}>
              <p>
                {budget.budget.node.budget.budget +
                  " " +
                  budget.budget.node.budget.currency.symbol}
              </p>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <p>Remaining</p>
            </Col>
            <Col span={12}>
              <p>
                {budget.budget.node.budget.remainingBudget +
                  " " +
                  budget.budget.node.budget.currency.symbol}
              </p>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <p>Description</p>
            </Col>
            <Col span={12}>
              <p>{budget.budget.node.budget.description}</p>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          {participants.map((participant) => (
            <Row className="mb-2">
              <ParticipantCard participant={participant} key={participant.id} />
            </Row>
          ))}
        </Col>
      </Row>
      {budget.budget.node.budget.spentRemainingPercentage <= 100 && (
        <Progress
          strokeColor={twoColors}
          percent={budget.budget.node.budget.spentRemainingPercentage}
          success={{ percent: -1000000 }}
        />
      )}
    </Modal>
  );
};

export default BudgetDetails;
