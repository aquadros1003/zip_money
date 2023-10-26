import { gql } from '@apollo/client';

const GET_USERS = gql`
    query GetUsers {
        users {
            edges {
                node {
                    id
                    firstName
                    lastName
                    email
                }
            }
        }
    }
`;

export default GET_USERS;