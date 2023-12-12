import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as ApolloHooksProvider,
} from "@apollo/client";
import REFRESH_TOKEN from "../api/mutations/RefreshToken";
import backendUrl from "../configs/BackendUrl";

const httpLink = createUploadLink({
  uri: `${backendUrl}graphql`,
  credentials: "include",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

client.mutate({
  mutation: REFRESH_TOKEN,
});

const ApolloProvider = ({ children }) => {
  client.mutate({
    mutation: REFRESH_TOKEN,
  });
  return <ApolloHooksProvider client={client}>{children}</ApolloHooksProvider>;
};

export default ApolloProvider;
