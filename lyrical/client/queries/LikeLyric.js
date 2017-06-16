import gql from 'graphql-tag';

export default gql`
  mutation LikeLyric($lyricId: ID!) {
    likeLyric(id: $lyricId) {
      id
      content
      likes
    }
  }
`;

