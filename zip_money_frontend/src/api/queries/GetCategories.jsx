import { gql } from "@apollo/client";

const GET_CATEGORIES = gql`
  query {
    categories {
      edges {
        node {
          id
          name
          avatar
        }
      }
    }
  }
`;

export default GET_CATEGORIES;
