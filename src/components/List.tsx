'use client';

import {
  TypedDocumentNode,
  gql,
  useQuery,
  useSuspenseQuery,
} from '@apollo/client';
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
  const { data } = useSuspenseQuery(query);

  console.log(data);

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
