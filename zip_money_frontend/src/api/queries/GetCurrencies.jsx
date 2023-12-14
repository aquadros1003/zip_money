import { gql } from "@apollo/client";

const GET_CURRENCIES = gql`
  query {
    currencies {
      edges {
        node {
          id
          name
          symbol
        }
      }
    }
  }
`;

export default GET_CURRENCIES;
