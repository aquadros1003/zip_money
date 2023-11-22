import { gql } from "@apollo/client";

const SIGN_OUT = gql`
    mutation SignOut {
        signOut{
            success
        }
    }
    `;

export default SIGN_OUT;