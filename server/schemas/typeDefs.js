const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
  }

  type Episode {
    _id: ID
    title: String
    description: String
    michaelWYF: String
    bradWYF: String
    bradArt: String
    michaelArt: String
    widget: String
    episode: Int
    comments: [Comment]
  }

  type Comment {
    _id: ID
    text: String
    createdBy: User
    createdAt: String
  }

  type Auth {
    token: ID
    user: User
  }

  input episodeInput {
    title: String!
    description: String!
    audio: String
    episode: Int
    season: Int
  }

  input commentInput {
    text: String
    createdBy: ID
    createdAt: String
  }

  type Query {
    user(email: String!): User
    users: [User]
    me: User
    comments(username: String): [Comment]
    episode(_id: ID): Episode
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
      addedPodcast: String
    ): User
    login(email: String!, password: String!): Auth
    addEpisode(input: episodeInput!): Episode
    addComment(input: commentInput!): User
    removeComment(_id: ID): Comment
  }
`;

module.exports = typeDefs;
