import { gql } from "@apollo/client";

const GET_BUDGETS = gql`
  query {
    me {
      budgets {
        edges {
          node {
            budget {
              id
              name
              budget
              endDate
              description
              currency {
                name
                symbol
              }
              owner {
                avatar
              }
              spentRemainingPercentage
              remainingBudget
            }
            isOwner
            isPined
          }
        }
      }
    }
  }
`;

export default GET_BUDGETS;
