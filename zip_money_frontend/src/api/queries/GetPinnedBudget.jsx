import { gql } from "@apollo/client";

const GET_PINNED_BUDGET = gql`
    query {
        me {
            pinnedBudget {
                id
                budget {
                    budget
                    spentRemainingPercentage
                    remainingBudget
                }
            }
        }
    }
`;

export default GET_PINNED_BUDGET;
