import { Button } from '@mantine/core';
import { IconBriefcase } from '@tabler/icons-react';
import { Roboto_Mono } from 'next/font/google';

const robertoFont = Roboto_Mono({ subsets: ['latin'] });
export default function Home() {
  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center gap-5">
      <h1>Home</h1>
      <IconBriefcase />
      <div className={`${robertoFont.className} font-bold`}>
        Professional Network
      </div>
      <Button>SignIn</Button>
    </div>
  );
}
