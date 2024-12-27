import React from 'react';
import ProfileTabs from '../../../../components/profile-tabs';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-5">
      <ProfileTabs/>
      <div>{children}</div>
    </div>
  );
}
