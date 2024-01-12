import { gql } from "@apollo/client";

const PIN_BUDGET = gql`
  mutation ($budgetId: ID!) {
    pinBudget(budgetId: $budgetId) {
      budget {
        isPined
      }
    }
  }
`;

export default PIN_BUDGET;
