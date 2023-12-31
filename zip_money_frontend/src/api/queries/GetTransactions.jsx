import { gql } from "@apollo/client";

const GET_TRANSACTIONS = gql`
  query GetTransactions(
    $first: Int
    $offset: Int
    $lastDaysRange: Int
    $categoryId: ID
    $budgetId: ID
    $currencyId: ID
    $dateFrom: DateTime
    $dateTo: DateTime
  ) {
    me {
      transactions(
        limit: $first
        offset: $offset
        lastDaysRange: $lastDaysRange
        categoryId: $categoryId
        budgetId: $budgetId
        currencyId: $currencyId
        dateFrom: $dateFrom
        dateTo: $dateTo
      ) {
        totalCount
        results {
          amount
          name
          currency {
            symbol
          }
          category {
            name
            avatar
          }
          date
        }
      }
    }
  }
`;

export default GET_TRANSACTIONS;
