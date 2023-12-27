import { gql } from "@apollo/client";

const CREATE_BUDGET = gql`
  mutation (
    $name: String!
    $amount: Decimal!
    $currencyId: String!
    $endDate: DateTime!
    $description: String
  ) {
    createBudget(
      name: $name
      amount: $amount
      currencyId: $currencyId
      endDate: $endDate
      description: $description
    ) {
      budget {
        name
        budget
        currency {
          name
          symbol
        }
        endDate
        description
      }
    }
  }
`;

export default CREATE_BUDGET;
