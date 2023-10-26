import { gql } from "@apollo/client";

const SIGN_UP = gql`
  mutation SignUp(
    $email: String!
    $password: String!
    $confirmPassword: String!
    $username: String!
  ) {
    singUp(
      email: $email
      password: $password
      confirmPassword: $confirmPassword
      username: $username
    ) {
      success
    }
  }
`;

export default SIGN_UP;
