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
              startDate
              endDate
              description
              currency {
                name
                symbol
              }
              owner {
                firstName
                lastName
                avatar
              }
              spentRemainingPercentage
              remainingBudget
              assignedUsers {
                edges {
                  node {
                    id
                    isOwner
                    user {
                      firstName
                      lastName
                      avatar
                    }
                  }
                }
              }
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
