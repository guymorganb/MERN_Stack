const { gql } = require('@apollo/server');
// type defs are the graphql schema

const typeDefs = `#graphql
  # When we query 'books' the Book object is returned
  type Query {
    books: [Book]
    me: User
  }

  type Auth {
    token: String!
    user: User
  }

  # Mutations
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(book: SavedBook!): User
    removeBook(bookId: String!): User
  }


  type Book {
    _id: ID
    authors: [String]
    description: String! # non-nullable feilds
    bookId: String!
    image: String
    link: String
    title: String!
  }

  input SavedBook {
      authors: [String]
      description: String!
      bookId: String!
      image: String
      link: String
      title: String!
  }

  type User {
    _id: ID
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }
`;

module.exports = typeDefs;