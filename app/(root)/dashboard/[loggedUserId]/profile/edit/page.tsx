import React from 'react'
import { GeneralProfileForm } from '../components/general-profile-form'
import { PasswordUpdateForm } from '../components/password-profile-form'
import { getUserById } from '@/actions/user'
type PageParams = {
    params: {
        loggedUserId: string
    },
}

const ProfilePage: React.FC<PageParams> = async ({ params }) => {
        const { loggedUserId } =  params; // Tambahkan await
        const response = await getUserById(loggedUserId);
        const me = response.success ? response.user : null;
    return (
    <div className="container min-w-96  mx-auto p-4 space-y-8">
            <h1 className="text-2xl font-bold">Profile Settings</h1>

            {/* Form untuk update data umum */}
            <GeneralProfileForm user={me } />

            {/* Form untuk update password */}
            <PasswordUpdateForm  userId={me?.id || ""}/>
        </div>
  )
}

export default ProfilePage

