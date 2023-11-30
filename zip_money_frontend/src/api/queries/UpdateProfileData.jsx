import { gql } from "@apollo/client";

const ME = gql`
  query Me {
    me {
      firstName
      lastName
      email
      phoneNumber
      description
      dateOfBirth
      facebookUrl
      instagramUrl
      twitterUrl
      avatar
    }
  }
`;

export default ME;
