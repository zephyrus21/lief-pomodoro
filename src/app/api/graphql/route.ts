import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { gql } from 'graphql-tag';
import { NextRequest } from 'next/server';

const resolvers = {
  Query: {
    hello: () => 'world',
  },
};

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

export async function GET(request: any) {
  return handler(request);
}

export async function POST(request:any) {
  return handler(request);
}
