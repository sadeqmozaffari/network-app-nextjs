'use client';
import { Button, Modal, Rating, Select, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Skill } from '@prisma/client';
import { IconPlus } from '@tabler/icons-react';
import { useActionState, useState } from 'react';
import { addUsersToSkills, AddUsersToSkillsState } from '../actions/action';

export default function AddUserToSkillBtn({
  allSkills,
}: {
  allSkills: Skill[];
}) {
  const [value, setValue] = useState(0);
  const initialState: AddUsersToSkillsState = {};
  const [state, dispatch] = useActionState(addUsersToSkills, initialState);
  const [opend, { open, close }] = useDisclosure();
  const data = allSkills.map((skill) => {
    return { label: skill.name, value: skill.id };
  });
  return (
    <>
      <Modal opened={opend} onClose={close} title="Add Skill" centered>
        <form action={dispatch}>
          <Stack gap={20}>
            <Select data={data} searchable name="skillId" />

            <Rating value={value} onChange={setValue} name="rating" />
            {state.errors?.rating && (
              <p className="text-red-800">{state.errors.rating}</p>
            )}
            <div>
              <Button type="submit">Submit</Button>
            </div>

            {state.message && <p className="text-red-800">{state.message}</p>}
            {state.success && <p className="text-green-800">{state.success}</p>}
          </Stack>
        </form>
      </Modal>
      <Button onClick={open} leftSection={<IconPlus />} variant="subtle">
        Add Skill
      </Button>
    </>
  );
}
