import { gql } from "@apollo/client";

const SIGN_UP = gql`
  mutation SignUp(
    $email: String!
    $password: String!
    $confirmPassword: String!
    $firstName: String!
    $lastName: String!
  ) {
    singUp(
      email: $email
      password: $password
      confirmPassword: $confirmPassword
      firstName: $firstName
      lastName: $lastName
    ) {
      success
    }
  }
`;

export default SIGN_UP;
