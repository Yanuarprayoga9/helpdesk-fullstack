import { getCurrentUser, getUserById } from '@/actions/user'
import { PageHeader } from '@/components/header'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'
type pageParams = {
    params: {
        loggedUserId: string
    }
}
const page: React.FC<pageParams> = async ({ params }) => {

    const { user: me } = await getUserById(params.loggedUserId)
    return (
        <div className=' min-h-screen  bg-background max-w-full break-words mx-2'>
            <div className='p-4 w-full grid md:grid-cols-5'>
                <div className='bg-red-200'>
                    <Image src={me?.imageUrl || ""} alt='test' width={160} height={160} />

                </div>
                <div className='bg-blue-200 col-span-4'>
                    <PageHeader title='Edit Profile' desc="edit profile page"/>
                </div>
            </div>
            {JSON.stringify(me)}
        </div>
    )
}


export default page
