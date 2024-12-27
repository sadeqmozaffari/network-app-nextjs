import GitHub from 'next-auth/providers/github';
import type { NextAuthConfig } from 'next-auth';

export default {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    jwt: async ({ token, account, user }) => {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user.id;
      }
      if (user) {
        token.accessToken = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.accessToken = token.accessToken;
      session.user.id = token.sub;

      return session;
    },
  },
} satisfies NextAuthConfig;
