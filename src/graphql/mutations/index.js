import {gql} from '@apollo/client';

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

export const CREATE_COURSE = gql`
  mutation CreateCourse($duration: Int!, $name: String!, $prerequisites: String!) {
      createCourse(
        data: {
          duration: $duration
          name: $name
          prerequisites: $prerequisites
        }
      ) {
        id
        course {
            id
            duration
            prerequisites
            name
        }
      }
}
  `;