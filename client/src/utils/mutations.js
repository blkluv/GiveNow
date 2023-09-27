import { gql } from '@apollo/client';
//declare const for LOGIN_USER that uses login mutation
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
//declare const for ADD_USER that uses addUser mutation
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
    token
    user{
    _id
    username
    }
    }
  }
`;

export const MAKE_DONATION = gql`
mutation makeDonation($amount: Int!, $organization: ID!) {
  makeDonation(amount: $amount, organization: $organization) {
    _id
    amount
  }
}
`;

export const MAKE_ORGANIZATION = gql`
mutation MakeOrganization($name: String!, $description: String!, $category: String!, $image: String) {
  makeOrganization(name: $name, description: $description, category: $category, image: $image) {
    _id
    name
    description
    image
  }
}
`;