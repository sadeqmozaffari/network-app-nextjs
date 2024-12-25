'use client';
import { Avatar, Table } from '@mantine/core';
import { User } from '@prisma/client';
import { IconUserCircle } from '@tabler/icons-react';

import Link from 'next/link';

export default function UserTable({ users }: { users: User[] }) {
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Avatar</Table.Th>
          <Table.Th>Name</Table.Th>
          <Table.Th>Email</Table.Th>
          <Table.Th>User Name</Table.Th>
          <Table.Th>First Name</Table.Th>
          <Table.Th>Last Name</Table.Th>
          <Table.Th>Job Title</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {users.map((user) => (
          <Table.Tr key={user.id}>
            <Table.Td>
              <Avatar src={user.image} size={50}>
                <IconUserCircle />
              </Avatar>
            </Table.Td>
            <Table.Td>
              <Link href={`/dashboard/people/${user.id}`}>{user.name}</Link>
            </Table.Td>
            <Table.Td>{user.email}</Table.Td>
            <Table.Td>{user.name}</Table.Td>
            <Table.Td>{user.firstName}</Table.Td>
            <Table.Td>{user.lastName}</Table.Td>
            <Table.Td>{user.jobTitle}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
