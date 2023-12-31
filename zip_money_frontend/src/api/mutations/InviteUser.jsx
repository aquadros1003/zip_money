import { gql } from "@apollo/client";

const INVITE_USER = gql`
  mutation ($email: String!, $budgetId: ID!) {
    inviteUser(email: $email, budgetId: $budgetId) {
      budget {
        isOwner
        isPined
      }
    }
  }
`;

export default INVITE_USER;
