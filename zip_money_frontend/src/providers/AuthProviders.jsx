import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as ApolloHooksProvider,
} from "@apollo/client";
import REFRESH_TOKEN from "../api/mutations/RefreshToken";

const httpLink = createUploadLink({
  uri: "http://localhost:8000/graphql",
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
