import { gql } from "@apollo/client";

const ME = gql`
  query Me {
    me {
      firstName
      lastName
      email
      avatar
    }
  }
`;

export default ME;
