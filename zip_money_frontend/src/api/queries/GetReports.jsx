import { gql } from "@apollo/client";

const GET_REPORTS = gql`
  query {
    me {
      reports {
        edges {
          node {
            id
            reportUrl
            createdAt
          }
        }
      }
    }
  }
`;

export default GET_REPORTS;
