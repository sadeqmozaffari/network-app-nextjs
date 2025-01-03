import { Avatar, Card, Group, Text } from '@mantine/core';
import { User } from '@prisma/client';
import { IconUserCircle } from '@tabler/icons-react';

export default function UserCard({ user }: { user: User }) {
  return (
    <Card shadow="md" padding="lg" withBorder>
      <Group justify="center">
        <Avatar src={user.image} size={100}>
          <IconUserCircle />
        </Avatar>
      </Group>
      <Group justify="center" mt="md" mb="xs">
        <Text fw={500}>
          {user.firstName}
          {user.lastName}
        </Text>
      </Group>
      <Group justify="center">
        <Text c="dimmed">{user.jobTitle}</Text>
      </Group>
    </Card>
  );
}
