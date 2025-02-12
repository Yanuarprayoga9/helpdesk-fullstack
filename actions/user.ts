"use server"

import { auth } from "@/auth"

export const currentUser = async () => {
    try {
        const session = await auth()
        return session?.user
    } catch (error) {
        return null
    }
}

export const currentUserRole = async () => {
    try {
        const session = await auth()
        return session?.user?.role
    } catch (error) {
        return null
    }
}