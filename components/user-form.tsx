'use client';

import { User } from '@prisma/client';
import { useActionState, useEffect, useState } from 'react';
import { updateUser } from '../actions/action';
import { Button, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import Editor from './editor';
export default function UserForm({ user }: { user: User }) {
  const initialState = { errors: {} };

  const [state, formAction, isPending] = useActionState(
    updateUser,
    initialState
  );
  const [bio, setBio] = useState(user.bio);
  function handleUpdate(html: string) {
    setBio(html);
  }
  useEffect(() => {
    if (state.success) {
      notifications.show({
        title: 'Success',
        message: 'Profile has been successfully updated',
        color: 'green',
      });
    } else if (state.message) {
      notifications.show({
        title: 'Error',
        message: 'The Form submission seems to be invalid',
        color: 'red',
      });
    }
  }, [state]);

  return (
    <div>
      <form action={formAction} className="flex flex-col gap-5 max-w-xl">
        <div>
          <TextInput
            name="jobTitle"
            label="Job Title"
            error={state?.errors?.jobTitle}
            defaultValue={user.jobTitle!}
          />
        </div>

        <div>
          {/* <Textarea
            name="bio"
            label="Bio"
            error={state?.errors?.bio}
            defaultValue={user.bio!}
          /> */}
          <label>Bio</label>
          <Editor content={user.bio || ''} onUpdate={handleUpdate} />
          <input type="hidden" name="bio" value={bio || ''} />
        </div>
        <div className="">
          <Button type="submit">Submit</Button>
        </div>
        {isPending ? 'Loading...' : ''}
        {state?.success && <p className="text-green">{state.success}</p>}
      </form>
    </div>
  );
}
