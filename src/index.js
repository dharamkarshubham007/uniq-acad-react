import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import store from "./redux/store";
import {ApolloClient, ApolloLink, ApolloProvider, concat, createHttpLink, gql, InMemoryCache} from "@apollo/client";
// import {setContext} from "@apollo/client/link/context";

const defaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    },
}
const httpLink = createHttpLink({
    uri: process.env.REACT_APP_BACKEND_URL,
});

const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext(({ headers = {} }) => ({
        headers: {
            ...headers,
            authorization: localStorage.getItem('token') || null,
        }
    }));

    return forward(operation);
})

// const authLink = setContext((_, { headers }) => {
//     // get the authentication token from local storage if it exists
//     const token = localStorage.getItem('token');
//     console.log(token);
//     // return the headers to the context so httpLink can read them
//     return {
//         headers: {
//             ...headers,
//             authorization: token ? `Bearer ${token}` : "",
//         }
//     }
// });

const client = new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache(),
    defaultOptions,
    typeDefs: gql`
      enum CreateUserRole {
        INSTRUCTOR
        STUDENT
      }
    `
})

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <ApolloProvider client={client}>
            <App />
          </ApolloProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
