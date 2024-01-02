import { gql } from "@apollo/client";

const ACTIVATE = gql`
  mutation ($uidb64: String!, $token: String!) {
    activate(uidb64: $uidb64, token: $token) {
      success
    }
  }
`;

export default ACTIVATE;
