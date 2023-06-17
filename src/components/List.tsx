'use client';

import { TypedDocumentNode, gql, useQuery } from '@apollo/client';
import React from 'react';

type ListProps = {};

const query: TypedDocumentNode<{
  users: {
    id: string;
    name: string;
    email: string;
  }[];
}> = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

const List = ({}: ListProps) => {
  const { data, loading, error } = useQuery(query);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {data?.users.map((user) => (
        <div key={user.id}>
          {user.name} - {user.email}
        </div>
      ))}
    </div>
  );
};

export default List;
