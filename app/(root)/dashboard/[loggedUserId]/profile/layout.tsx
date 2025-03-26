import { getUserById } from '@/actions/user'
import { Header } from '@/components/header'

import React from 'react'
import EditProfileButton from './components/edit-button'
import ProfileImage from '@/components/ProfileImageUploader'

type PageParams = {
    params: Promise<{ loggedUserId: string }>,
    children: React.ReactNode
}

const Layout: React.FC<PageParams> = async ({ params, children }) => {
    const { loggedUserId } = await params; // Tambahkan await
    const response = await getUserById(loggedUserId);
    const me = response.success ? response.user : null;

    return (
        <div className='w-full min-h-screen '>
            <div className='p-4 w-full md:grid  md:grid-cols-5 gap-7'>
                {/* Sidebar */}
                <div className='space-y-4 flex flex-col  w-full md:w-auto'>
                    <ProfileImage imageUrl={me?.imageUrl ?? "/ss"} userId={loggedUserId} />
                    <div className="space-y-2 w-full flex flex-col  md:text-left">
                        <p className='text-xl font-semibold'>{me?.name}</p>
                        <span className='text-sm text-muted-foreground'>{me?.role.name}</span>
                        <EditProfileButton />
                    </div>
                </div>

                {/* Konten */}
                <div className='md:col-span-4 w-full border rounded-lg px-6 py-4'>
                    <Header
                        title="Profile"
                        desc="View and manage your personal information, update account details, and customize your preferences."
                    />
                    <div className="flex-1 my-4">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout;
