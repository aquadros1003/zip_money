import { gql } from "@apollo/client";

const SIGN_OUT = gql`
        mutation SocialAuth($clientId: String!, $credentials: String!){
            socialAuth(clientId: $clientId, credentials: $credentials){
            user{
                email
                firstName
                lastName
            }
            }
        }
    `;

export default SIGN_OUT;
