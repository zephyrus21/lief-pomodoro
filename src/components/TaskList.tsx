'use client';

import { gql, useQuery } from '@apollo/client';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  List,
} from 'grommet';
import { useSession } from 'next-auth/react';
import React from 'react';

type TaskListProps = {};

const query = gql`
  query UserTasks($email: String!) {
    userTasks(email: $email) {
      id
      title
      completed
    }
  }
`;

const TaskList = ({}: TaskListProps) => {
  const { data: session, status } = useSession();
  const { data, loading, error } = useQuery<{
    userTasks: { id: string; title: string; completed: boolean }[];
  }>(query, {
    variables: {
      email: session?.user?.email,
    },
  });

  if (loading) return <div>Loading...</div>;

  return (
    <Box direction='row'>
      {data?.userTasks.map((task) => (
        <Card key={task.id} height='small' width='small' background='light-1'>
          <CardHeader pad='medium'>{task.title}</CardHeader>
          <CardBody pad='medium'>
            {task.completed ? 'Completed' : 'Not Completed'}
          </CardBody>
        </Card>
      ))}
    </Box>
  );
};

export default TaskList;
