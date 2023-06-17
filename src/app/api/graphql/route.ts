import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { gql } from 'graphql-tag';
import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

const typeDefs = gql`
  type Query {
    users: [User!]!
  }

  type Mutation {
    createTask(data: CreateTaskInput!): Task!
  }

  input CreateTaskInput {
    title: String!
    authorEmail: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      const users = await prisma.user.findMany();
      return users;
    },
  },
  Mutation: {
    createTask: async (parent: any, args: any) => {
      const task = await prisma.task.create({
        data: {
          title: args.data.title,
          completed: false,
          author: {
            connect: { email: args.data.authorEmail },
          },
        },
      });
      return task;
    },
  },
};

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

export async function POST(request: any) {
  return handler(request);
}
