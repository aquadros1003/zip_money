import { gql } from "@apollo/client";

const GET_EXPENSES = gql`
    query GetMonthlyExpenses{
        me {
            monthlyExpenses
            dailyExpenses
        }
    }
`;

export default GET_EXPENSES;