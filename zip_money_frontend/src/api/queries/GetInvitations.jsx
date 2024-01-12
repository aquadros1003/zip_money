import { gql } from "@apollo/client";

const GET_INVITATIONS = gql`
  query {
    me {
      invitations {
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
                firstName
                lastName
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

export default GET_INVITATIONS;
