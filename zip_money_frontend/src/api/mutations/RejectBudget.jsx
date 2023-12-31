import { gql } from "@apollo/client";

const REJECT_BUDGET = gql`
  mutation ($budgetId: ID!) {
    rejectBudget(budgetId: $budgetId) {
      budget {
        isOwner
        isPined
      }
    }
  }
`;

export default REJECT_BUDGET;
