"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface NavigationProgressProps {
  href: string
  children: React.ReactNode
  className?: string
  delay?: number
}

export const NavigationProgress = ({ href, children, className = "", delay = 1000 }: NavigationProgressProps) => {
  const router = useRouter()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isRedirecting, setIsRedirecting] = useState(false)

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setIsRedirecting(true)

    // Dispatch custom event to trigger progress bar
    document.dispatchEvent(new Event("routeChangeStart"))

    // Delay the actual navigation to show the progress bar
    setTimeout(() => {
      router.push(href)

      // Simulate the navigation completion
      setTimeout(() => {
        document.dispatchEvent(new Event("routeChangeComplete"))
        setIsRedirecting(false)
      }, 100)
    }, delay)
  }

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  )
}
