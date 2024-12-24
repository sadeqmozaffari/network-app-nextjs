import { auth } from '@/lib/auth';
import LoginBtn from '../../../components/login-btn';
// import { getProviders } from 'next-auth/react';
// import SigninBtn from '../../../components/signIn-btn';

export default async function SignIn() {
  const session = await auth();

  if (session) {
    return {
      redirect: {
        destination: '/',
      },
    };
  }
  // const providers = await getProviders();
  return (
    <>
      {/* {Object.values(providers).map((provider: any) => (
        <div
          key={provider.name}
          className="flex w-screen h-screen justify-center items-center"
        >
          <SigninBtn provider={provider} />
        </div>
      ))} */}
      <LoginBtn />
    </>
  );
}
