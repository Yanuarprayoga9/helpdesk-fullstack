import { Header } from '@/components/header';
import React from 'react';
import EditProfileButton from './components/edit-button';
import ProfileImage from '@/components/ProfileImageUploader';
import { getCurrentUser } from '@/@data/user';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = async ({ children }) => {
  const { user } = await getCurrentUser();
  if (!user?.id) return <div className="text-red-500 text-center">User not found.</div>;
  return (
    <div className="w-full min-h-screen">
      <div className="p-4 w-full md:grid md:grid-cols-5 gap-7">
        {/* Sidebar */}
        <div className="space-y-4 flex flex-col w-full md:w-auto">
          <ProfileImage imageUrl={user.imageUrl ?? "/ss"} userId={user.id} />
          <div className="space-y-2 w-full flex flex-col md:text-left">
            <p className="text-xl font-semibold">{user.name}</p>
            <span className="text-sm text-muted-foreground">{user.role.name}</span>
            <EditProfileButton />
          </div>
        </div>

        {/* Konten */}
        <div className="md:col-span-4 w-full border rounded-lg px-6 py-4">
          <Header
            title="Profile"
            desc="View and manage your personal information, update account details, and customize your preferences."
          />
          <div className="flex-1 my-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
