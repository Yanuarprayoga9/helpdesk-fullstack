"use client"
import { useSession } from "next-auth/react"

export const useGetCurrentUser = () => {
    const session = useSession()
    return session.data?.user
}
export const useGetCurrentUserRoles = () => {
    const session = useSession()
    return session.data?.user?.roles
}