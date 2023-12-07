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
              owner {
                avatar
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
