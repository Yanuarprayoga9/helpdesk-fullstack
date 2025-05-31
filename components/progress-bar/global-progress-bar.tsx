"use client"

import { useEffect, useState, Suspense } from "react"
import { usePathname, useSearchParams } from "next/navigation"

const ProgressBarContent = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Progress animation function
  const startProgress = () => {
    setIsLoading(true)
    setProgress(0)

    // Animate progress in stages
    const timer1 = setTimeout(() => setProgress(30), 100)
    const timer2 = setTimeout(() => setProgress(60), 300)
    const timer3 = setTimeout(() => setProgress(80), 600)
    const timer4 = setTimeout(() => setProgress(95), 900)

    // Store timers for cleanup
    return [timer1, timer2, timer3, timer4]
  }

  const completeProgress = () => {
    setProgress(100)
    setTimeout(() => {
      setIsLoading(false)
      setProgress(0)
    }, 200)
  }

  // Track if we're currently navigating
  const [navigationStarted, setNavigationStarted] = useState(false)

  useEffect(() => {
    let timers: NodeJS.Timeout[] = []

    // Handle link clicks
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest("a")

      if (
        link &&
        link.href &&
        !link.href.startsWith("mailto:") &&
        !link.href.startsWith("tel:") &&
        !link.href.startsWith("#") &&
        !link.target &&
        link.origin === window.location.origin
      ) {
        const url = new URL(link.href)
        // Only start progress if navigating to a different page
        if (url.pathname !== pathname || url.search !== window.location.search) {
          timers = startProgress()
          setNavigationStarted(true)
        }
      }
    }

    // Handle browser back/forward
    const handlePopState = () => {
      timers = startProgress()
      setNavigationStarted(true)
    }

    // Add event listeners
    document.addEventListener("click", handleLinkClick)
    window.addEventListener("popstate", handlePopState)

    // Cleanup function
    return () => {
      document.removeEventListener("click", handleLinkClick)
      window.removeEventListener("popstate", handlePopState)
      // Clear any pending timers
      timers.forEach((timer) => clearTimeout(timer))
    }
  }, [pathname]) // Only depend on pathname to avoid infinite loops

  // Complete progress when route changes
  useEffect(() => {
    if (navigationStarted) {
      completeProgress()
      setNavigationStarted(false)
    }
    // eslint-disable-next-line
  }, [pathname, searchParams]) // This will trigger when navigation completes

  if (!isLoading) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-1 bg-transparent pointer-events-none">
      <div
        className="h-full transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #0969da 0%, #0550ae 100%)",
          boxShadow: "0 0 10px rgba(9, 105, 218, 0.5)",
        }}
      />
    </div>
  )
}

export const GlobalProgressBar = () => {
  return (
    <Suspense fallback={null}>
      <ProgressBarContent />
    </Suspense>
  )
}
