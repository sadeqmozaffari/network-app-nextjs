import { redirect } from 'next/navigation';
import { auth } from '../../../lib/auth';
import SessionProvider from '../../../components/session-provider';
import AppShellContainer from '../../../components/app-shell-container';

export default async function Layout({
  children,

}: {
    children: React.ReactNode;

}) {
  const session = await auth();
  if (!session) {
    redirect('/signin');
  }
  return (
    <SessionProvider session={session} >
      <AppShellContainer user={session.user}>{children}</AppShellContainer>
    </SessionProvider>
  );
}
