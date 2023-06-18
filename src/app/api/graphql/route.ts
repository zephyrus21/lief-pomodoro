import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { gql } from 'graphql-tag';
import { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

type Context = {
  prisma: PrismaClient;
};

const typeDefs = gql`
  type Query {
    users: [User!]!
    user(email: String!): User!
    userTasks(email: String!): [Task!]!
  }

  type Mutation {
    createTask(title: String!, authorEmail: String!): Task!
    updateTask(id: ID!, title: String!): Task!
    updateTaskStatus(id: ID!, completed: Boolean!): Task!
    deleteTask(id: ID!): Task!
  }

  type Task {
    id: ID!
    title: String!
    completed: Boolean!
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }
`;

const resolvers = {
  Query: {
    users: async (parent: any, args: any, context: Context) => {
      const users = await context.prisma.user.findMany();
      return users;
    },
    user: async (parent: any, args: any, context: Context) => {
      const user = await context.prisma.user.findUnique({
        where: { email: args.email },
      });
      return user;
    },
    userTasks: async (parent: any, args: any, context: Context) => {
      const tasks = await context.prisma.task.findMany({
        where: { authorId: args.email },
      });
      return tasks;
    },
  },
  Mutation: {
    createTask: async (parent: any, args: any, context: any) => {
      const task = await context.prisma.task.create({
        data: {
          title: args.title,
          author: {
            connect: { email: args.authorEmail },
          },
        },
      });
      return task;
    },
    updateTask: async (parent: any, args: any, context: any) => {
      const task = await context.prisma.task.update({
        where: { id: args.id },
        data: { title: args.title },
      });
      return task;
    },
    updateTaskStatus: async (parent: any, args: any, context: any) => {
      const task = await context.prisma.task.update({
        where: { id: args.id },
        data: { completed: args.completed },
      });
      return task;
    },
    deleteTask: async (parent: any, args: any, context: any) => {
      const task = await context.prisma.task.delete({
        where: { id: args.id },
      });
      return task;
    },
  },
};

const server = new ApolloServer<{}>({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req, res) => ({ req, res, prisma: new PrismaClient() }),
});

export async function GET(request: any) {
  return handler(request);
}

export async function POST(request: any) {
  return handler(request);
}
