'use client';

import { gql, useMutation } from '@apollo/client';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

type CreateTaskProps = {};

const CreateTaskMutation = gql`
  mutation CreateTask($title: String!, $authorEmail: String!) {
    createTask(title: $title, authorEmail: $authorEmail) {
      id
      title
      completed
    }
  }
`;

const CreateTask = ({}: CreateTaskProps) => {
  const { data: session, status } = useSession();
  const [title, setTitle] = useState('');
  const [createTask] = useMutation(CreateTaskMutation);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createTask({
      variables: {
        title,
        authorEmail: session?.user?.email,
      },
    });

    setTitle('');
  };

  if (status === 'loading') return <div>Loading...</div>;

  if (!session?.user) return <div>Access Denied</div>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button>Create Task</button>
      </form>
    </div>
  );
};

export default CreateTask;
