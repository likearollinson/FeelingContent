const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    addedEpisode: Episode
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
    episodeNumber: Int
    createdAt: String
    comments: [Comment]
  }

  type Comment {
    _id: ID
    text: String
    createdBy: [User]
    createdAt: String
  }

  type WhatYaFeelin {
    _id: ID
    episodeNumber: Int
    michaelWYF: String
    bradWYF: String
    bradArt: String
    michaelArt: String
    michaelWidget: String
    bradWidget: String
    michaelMichaelReview: String
    michaelBradReview: String
    bradMichaelReview: String
    bradBradReview: String
    michaelMichaelCups: String
    michaelBradCups: String
    bradMichaelCups: String
    bradBradCups: String
    createdAt: String
  }

  type Auth {
    token: ID
    user: User
  }

  input episodeInput {
    title: String!
    description: String!
    widget: String
    episodeNumber: Int
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
    episodes: [Episode]
    addedEpisode: Episode
    whatYaFeelin(episodeNumber: Int!): WhatYaFeelin
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
