import {gql} from "@apollo/client";

export const GET_AVAILABLE_COURSES_FOR_STUDENT = gql`
    query availableCoursesForStudent {
        availableCoursesForStudent {
            id
            name
            duration
            numberOfStudents
            prerequisites
            instructor {
              user {
                email
                firstName
                lastName
              }
            }
        }
    }
`;

export const GET_ENROLLED_COURSES_OF_STUDENT = gql`
    query studentEnrolledCourses{
      studentEnrolledCourses {
        id
        status
        course {
          id
          name
          duration
          prerequisites
          instructor {
            user {
              email
              firstName
              lastName
    
            }
          }
        }
      }
    }
`

export const GET_INSTRUCTOR_COURSES = gql`
    query instructorCourses {
      instructorCourses {
        id
        course {
            prerequisites
            duration
            id
            name
            numberOfStudents
        }
      }
    }
`
