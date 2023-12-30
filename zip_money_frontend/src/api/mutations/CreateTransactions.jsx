import { gql } from "@apollo/client";

const CREATE_TRANSACTION = gql`
  mutation (
    $amount: Decimal!
    $name: String!
    $categoryId: String!
    $currencyId: String
    $budgetId: String
  ) {
    createTransaction(
      amount: $amount
      name: $name
      categoryId: $categoryId
      currencyId: $currencyId
      budgetId: $budgetId
    ) {
      transaction {
        name
        amount
        currency {
          name
          symbol
        }
        category {
          name
          avatar
        }
        budget {
          name
          endDate
        }
      }
    }
  }
`;

export default CREATE_TRANSACTION;
