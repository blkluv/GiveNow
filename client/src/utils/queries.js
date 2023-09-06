import { gql } from '@apollo/client';
//This holds the query GET_ME, which will execute the me query set up using Apollo Server.
export const GET_ME = gql`
  { 
    me {
      _id
      username
      email
      donations {
        _id
        amount
        date
        organization {
          name
        }
      }
    }
  }
`;

