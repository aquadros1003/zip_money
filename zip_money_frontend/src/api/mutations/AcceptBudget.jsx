import { gql } from "@apollo/client";

const ACCEPT_BUDGET = gql`
  mutation ($budgetId: ID!) {
    acceptBudget(budgetId: $budgetId) {
      budget {
        isOwner
        isPined
      }
    }
  }
`;

export default ACCEPT_BUDGET;
