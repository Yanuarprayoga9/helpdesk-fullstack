"use client"
import { login } from '@/actions/login'
import React from 'react'

export const LoginForm = () => {

    const handleClick = async () => {
        await login({ email: "yanuarprayogat@gmail.com", password: "yanuar123" });
    }
  return (
    <div onClick={handleClick}>LoginForm</div>
  )
}
