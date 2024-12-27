import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@mantine/core/styles.css';
import './globals.css';

import {
  ColorSchemeScript,
  createTheme,
  mantineHtmlProps,
  MantineProvider,
} from '@mantine/core';
import '@mantine/tiptap/styles.css';
import '@mantine/notifications/styles.css';
import '@/styles/editor.css';
import { Notifications } from '@mantine/notifications';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const theme = createTheme({
  defaultRadius: 'sm',
  primaryColor: 'blue',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MantineProvider defaultColorScheme="dark" theme={theme}>
          {children}
          <Notifications />
        </MantineProvider>
      </body>
    </html>
  );
}
