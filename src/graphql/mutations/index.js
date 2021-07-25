import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
      login(data: {
        email: $email,
        password: $password
      }) {
        user {
          id
          firstName
          lastName
          email
          password
          userRole {
            id
            role {
              id
              role
            }
          }
        }
        token
      }
    }
`;