import { gql } from "@apollo/client";

const GET_TRANSACTIONS = gql`
    query GetTransactions{
        me {
        transactions {
            edges {
            node {
                amount
                currency {
                symbol
                }
                category {
                name
                }
                date
            }
            }
        }
        }
    }
`;

export default GET_TRANSACTIONS;
