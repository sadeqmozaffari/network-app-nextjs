'use client';

import { Button } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons-react';
import { signIn } from 'next-auth/react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SigninBtn({ provider }: { provider: any }) {
  return (
    <Button
      leftSection={<IconBrandGithub />}
      onClick={() => signIn(provider.id)}
    >
      Sign In With GitHub
    </Button>
  );
}
