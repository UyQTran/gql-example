import { GraphQLScalarType } from 'graphql';

const fakeDB = [];

export const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return new Date(value); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast).toDateString; // ast value is always in string format
      }
      return null;
    }
  }),
  Query: {
    getMessages: () => {
      return fakeDB;
    }
  },
  Mutation: {
    createMessage: (root, args) => {
      fakeDB.push({text: args.message, timestamp: Date.now()});
      return true;
    }
  }
};