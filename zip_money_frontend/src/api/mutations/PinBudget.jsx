import { gql } from "@apollo/client";

const PIN_BUDGET = gql`
  mutation ($budgetId: ID!) {
    pinBudget(budgetId: $budgetId) {
      budget {
        isPined
        isOwner
      }
    }
  }
`;

export default PIN_BUDGET;
