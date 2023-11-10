import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import ME from "../api/queries/Me";

export const useUser = () => {
  const { data, loading, refetch } = useQuery(ME);
  const user = data?.me;
  const userId = user?.id;
  const firstName = user?.firstName;
  const lastName = user?.lastName;
  const email = user?.email;
  const isLogged = !!user;

  console.log(isLogged);
  return {
    user,
    userId,
    firstName,
    lastName,
    email,
    isLogged,
    loading,
    refetch,
  };
};

export default useUser;
