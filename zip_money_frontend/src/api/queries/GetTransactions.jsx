import { gql } from "@apollo/client";

const GET_TRANSACTIONS = gql`
  query GetTransactions {
    me {
      transactions {
        edges {
          node {
            amount
            name
            currency {
              symbol
            }
            category {
              name
              avatar
            }
            date
          }
        }
      }
    }
  }
`;

export default GET_TRANSACTIONS;
