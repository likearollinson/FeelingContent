import { gql } from "@apollo/client";

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const GET_ME = gql`
  {
    me {
      _id
      firstName
      lastName
      email
      addedPodcast {
        _id
        title
        description
        image
        episodes {
          title
          audio
          season
          episode
          _id
        }
      }
    }
  }
`;

export const QUERY_ALL_EPISODES = gql`
  {
    episodes {
      _id
      title
      description
      michaelWYF
      bradWYF
      bradArt
      michaelArt
      widget
      episodeNumber
    }
  }
`;
export const QUERY_SINGLE_EPISODE = gql`
  query episode($_id: ID!) {
    episode(_id: $_id) {
      _id
      title
      description
      michaelWYF
      bradWYF
      michaelArt
      bradArt
      widget
      episode
    }
  }
`;
