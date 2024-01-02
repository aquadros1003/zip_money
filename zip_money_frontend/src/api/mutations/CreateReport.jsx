import { gql } from "@apollo/client";

const CREATE_REPORT = gql`
  mutation createReport(
    $lastDaysRange: Int
    $categoryId: ID
    $budgetId: ID
    $currencyId: ID
    $dateFrom: DateTime
    $dateTo: DateTime
  ) {
    createReport(
      lastDaysRange: $lastDaysRange
      categoryId: $categoryId
      budgetId: $budgetId
      currencyId: $currencyId
      dateFrom: $dateFrom
      dateTo: $dateTo
    ) {
      report {
        reportUrl
      }
    }
  }
`;

export default CREATE_REPORT;
