import React from "react";
import BudgetCard from "../components/BudgetCard";
import GET_BUDGETS from "../api/queries/GetBudgets";
import { Spin } from "antd";
import { useQuery } from "@apollo/client";

const Budget = () => {
  const { loading, error, data } = useQuery(GET_BUDGETS);
  if (loading) return <Spin />;
  if (error) return `Error! ${error.message}`;

  const budgets = data.me.budgets.edges;
  return (
    <div className="container">
      <div className="row">
        {budgets.map((budget) => (
          <div className="col-md-6 col-lg-4" key={budget.node.id}>
            <BudgetCard
              title={budget.node.budget.name}
              value={budget.node.budget.budget}
              subtitle={`Ends on ${budget.node.budget.endDate}`}
              isPinned={budget.node.isPined}
              budgetId={budget.node.budget.id}
              avatar={budget.node.budget.owner.avatar}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Budget;
