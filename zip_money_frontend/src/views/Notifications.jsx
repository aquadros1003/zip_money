import React from "react";
import { useQuery } from "@apollo/client";
import { Spin } from "antd";
import GET_INVITATIONS from "../api/queries/GetInvitations";
import Notification from "../components/Notification";

const Notifications = () => {
  const { loading, error, data } = useQuery(GET_INVITATIONS);
  if (loading) return <Spin />;
  if (error) return `Error! ${error.message}`;
  console.log(data);
  return (
    (data.me.invitations.edges.length > 0 && (
      <div className="container">
        <div className="column">
          {data.me.invitations.edges.map((invitation) => (
            <div className="p-3">
              <Notification budget={invitation.node} id={invitation.node.id} />
            </div>
          ))}
        </div>
      </div>
    )) || (
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-4">
            <h1>No new notifications</h1>
          </div>
        </div>
      </div>
    )
  );
};

export default Notifications;
