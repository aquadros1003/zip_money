import { gql } from "@apollo/client";

const UPDATE_AVATAR = gql`
    mutation updateAvatar($image: Upload!) {
        updateAvatar(avatar: $image) {
            user {
                avatar
            }
        }
    }
`;

export default UPDATE_AVATAR;
