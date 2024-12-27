'use client';
import { AppShell, Avatar, Burger, Menu, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconDashboard,
  IconLogout,
  IconSettings,
  IconStar,
  IconUserCircle,
  IconUsers,
} from '@tabler/icons-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import SearchInput from './search-input';

export default function AppShellContainer({
  children,
  user,
}: {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
}) {
  const [opend, { toggle }] = useDisclosure();
  const pathname = usePathname();
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opend } }}
      padding="md"
    >
      <AppShell.Header>
        <div className="flex justify-between h-full ">
          <div className="flex h-full items-center gap-5 p=5">
            <Burger opened={opend} onClick={toggle} hiddenFrom="sm" size="sm" />
            Pofessional Network
          </div>
          <div className="flex justify-end gap-5 h-full items-center p-5">
            <div>
              <SearchInput />
            </div>

            <div>
              <Menu>
                <Menu.Target>
                  <Avatar src={user.image}>
                    <IconUserCircle />
                  </Avatar>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Menu</Menu.Label>
                  <Menu.Item leftSection={<IconSettings />}>
                    <Link href="/dashboard/profile">Edit Profile</Link>
                  </Menu.Item>

                  {/* <Menu.Item leftSection={<IconUser />}>
                  <Link href="/">Profile</Link>
                </Menu.Item> */}

                  <Menu.Item
                    leftSection={<IconLogout />}
                    onClick={() => signOut()}
                  >
                    SignOut
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>
          </div>
        </div>
      </AppShell.Header>
      <AppShell.Navbar>
        <NavLink
          component={Link}
          href="/dashboard"
          label="Dashboard"
          leftSection={<IconDashboard />}
          active={pathname === '/dashboard'}
        />

        <NavLink
          component={Link}
          href="/dashboard/people"
          label="Peole"
          leftSection={<IconUsers />}
          active={pathname === '/dashboard/people'}
        />

        <NavLink
          component={Link}
          href="/dashboard/skills"
          label="Skills"
          leftSection={<IconStar />}
          active={pathname === '/dashboard/skills'}
        />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
      <AppShell.Footer>Footer</AppShell.Footer>
    </AppShell>
  );
}
