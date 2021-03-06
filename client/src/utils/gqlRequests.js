import gql from "graphql-tag";
import { getAccessToken, isLoggedIn } from "./auth";
import { ApolloClient, HttpLink, InMemoryCache, ApolloLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const uri = "http://localhost:5000/graphql";

const authLink = new ApolloLink((operation, forward) => {
  if (isLoggedIn()) {
    operation.setContext(({ headers }) => ({
      headers: {
        authorization: "Bearer " + getAccessToken(),
      },
    }));
  }
  return forward(operation);
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, errorLink, new HttpLink({ uri })]),
  cache: new InMemoryCache(),
});

export async function createUser(input) {
  const mutation = gql`
    mutation CreatUser($input: CreateUserInput) {
      user: createUser(input: $input) {
        id
        title
        company {
          id
          name
        }
      }
    }
  `;
  // const { job } = await gqlReq(mutation, { input });
  const {
    data: { user },
  } = await client.mutate({ mutation, variables: { input } });
  return user;
}

export async function getUser(id) {
  const query = gql`
    query UserQuery($id: ID!) {
      user(id: $id) {
        id
        firstname
        lastname
        phonenumber
        role
        email
        phone
      }
    }
  `;

  const {
    data: { user },
  } = await client.query({ query, variables: { id } });
  return user;
}

export async function getUsers() {
  const query = gql`
    {
      users {
        id
        email
        firstname
        lastname
        role
        city
        state
        zip
      }
    }
  `;
  const {
    data: { users },
  } = await client.query({ query });

  return users;
}

export async function getUsersTEST() {
  const response = await fetch(uri, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query: `
    query{
      users{
        id
        firstname
        lastname
      }
    }`,
    }),
  });

  const { data } = await response.json();
  return data;
}
