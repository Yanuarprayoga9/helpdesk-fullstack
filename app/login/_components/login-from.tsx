"use client"
import { login } from '@/actions/login'
import React from 'react'

export const LoginForm = () => {

    const handleClick = async () => {
        await login({ email: "yanuar@gmail.com", password: "yanuar" });
    }
  return (
    <div onClick={handleClick}>LoginForm</div>
  )
}
