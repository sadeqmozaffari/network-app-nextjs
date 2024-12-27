'use client';
import { Button } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { deleteUserToSkill } from '../actions/action';

export default function DeleteUserToSkillBtn({ skillId }: { skillId: string }) {
  function handleClick() {
    console.log('Deleting user to skill:', skillId);
    deleteUserToSkill(skillId);
  }
  return (
    <Button
      leftSection={<IconTrash />}
      variant="subtle"
      onClick={handleClick}
      color="red"
    >
      Remove
    </Button>
  );
}
