import { gql } from 'apollo-server-express';

export const typeDefs = gql`

  type Query {
    getMessages: [Message]
  }

  type Mutation {
    createMessage(message: String): Boolean
  }

  type Message {
    text: String
    timestamp: Date
  }

  scalar Date
`;