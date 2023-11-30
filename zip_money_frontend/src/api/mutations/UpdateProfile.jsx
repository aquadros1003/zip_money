import { gql } from "@apollo/client";

const UPDATE_PROFLE = gql`
    mutation UpdateProfile(
        $firstName: String!
        $lastName: String!
        $phoneNumber: String
        $dateOfBirth: DateTime
        $description: String
        $facebookUrl: String
        $instagramUrl: String
        $twitterUrl: String
    ) {
        updateProfile(
        firstName: $firstName
        lastName: $lastName
        phoneNumber: $phoneNumber
        dateOfBirth: $dateOfBirth
        description: $description
        facebookUrl: $facebookUrl
        instagramUrl: $instagramUrl
        twitterUrl: $twitterUrl
        ) {
        user {
            firstName
            lastName
            email
            description
            phoneNumber
            dateOfBirth
            facebookUrl
            instagramUrl
            twitterUrl
        }
        }
    }
`;

export default UPDATE_PROFLE;
