import { gql } from "@apollo/client";

const REFRESH_TOKEN = gql`
  mutation {
    refreshToken {
      token
    }
  }
`;

export default REFRESH_TOKEN;
