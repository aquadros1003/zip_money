import React from "react";
import { Card, Button } from "antd";
import { useNavigate } from "react-router-dom";

export const NotPinnedBudget = () => {
    const navigate = useNavigate();
    return (
        <Card>
            <div className="text-center not-pinned-budget">
                <h4 className="mb-2 font-weight-bold">Pinned Budget</h4>
                <Button
                    type="primary"
                    className="mt-3"
                    onClick={() => navigate("/dashboard/budget")}
                    style={{filter: 'none'}}
                >
                    Create Budget
                </Button>
                <div className="mt-3 mb-2 mx-auto text-muted" style={{ maxWidth: "150px" }}>
                    You have not pinned any budget yet.
                </div>
            </div>
        </Card>
    );
}

export default NotPinnedBudget;
