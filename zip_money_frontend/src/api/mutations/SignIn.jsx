import { gql } from "@apollo/client";

const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
      user {
        firstName
        lastName
        email
      }
    }
  }
`;

export default SIGN_IN;
