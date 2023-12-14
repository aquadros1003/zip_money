import { gql } from "@apollo/client";

const GET_CATEGORIES = gql`
  query {
    categories {
      edges {
        node {
          id
          name
          image
        }
      }
    }
  }
`;

export default GET_CATEGORIES;
