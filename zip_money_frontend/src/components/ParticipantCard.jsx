import React from "react";
import { CrownOutlined } from "@ant-design/icons";
import AvatarImg from "../assets/default-avatar.jpg";
import { Avatar } from "antd";
import backendUrl from "../configs/BackendUrl";

export const ParticipantCard = (participant) => {
  return (
    <div
      className="d-flex align-items-center justify-content-between p-2"
      style={{
        border: "1px solid #e8e8e8",
        borderRadius: "5px",
        width: "100%",
      }}
    >
      {participant?.participant?.isOwner && (
        <CrownOutlined style={{ color: "#fadb14" }} />
      )}
      <span className="ml-2">
        {participant?.participant?.firstName +
          " " +
          participant?.participant?.lastName}
      </span>
      <Avatar
        size={30}
        src={
          participant?.participant?.avatar
            ? backendUrl + participant?.participant?.avatar
            : AvatarImg
        }
      />
    </div>
  );
};
export default ParticipantCard;
