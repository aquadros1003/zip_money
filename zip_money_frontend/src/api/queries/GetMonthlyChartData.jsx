import { gql } from "@apollo/client";

const GET_MONTHLY_CHART_DATA = gql`
    query {
        me {
            monthlyTransactions {
                edges {
                    node {
                        dayDate
                        amount
                }
            }
        }
        }
    }
`;

export default GET_MONTHLY_CHART_DATA;
