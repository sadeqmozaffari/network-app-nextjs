/* eslint-disable @typescript-eslint/no-explicit-any */
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: any;
    } & DefaultSession['user'];
    accessToken: any;
  }
}
