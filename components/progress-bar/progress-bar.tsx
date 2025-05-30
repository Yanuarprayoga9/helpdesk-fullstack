"use client"

import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"

interface ProgressBarProps {
  color?: string
  height?: number
  duration?: number
}

export const ProgressBar = ({
  color = "#0969da", // GitHub-like blue color
  height = 3,
  duration = 800,
}: ProgressBarProps) => {
  const [visible, setVisible] = useState(false)
  const [width, setWidth] = useState(0)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Track navigation state
  const [isNavigating, setIsNavigating] = useState(false)

  // Start progress animation
  const startProgress = () => {
    setVisible(true)
    setWidth(0)

    // Quickly move to 30%
    setTimeout(() => setWidth(30), 50)

    // Slowly progress to 70%
    setTimeout(() => setWidth(70), 300)

    // Progress to 90% and wait for completion
    setTimeout(() => setWidth(90), 600)
  }

  // Complete progress animation
  const completeProgress = () => {
    setWidth(100)

    // Hide the progress bar after completion
    setTimeout(() => {
      setVisible(false)
      setWidth(0)
    }, 200)
  }

  // Monitor for navigation events using history API
  useEffect(() => {
    // Intercept history methods
    const originalPushState = history.pushState
    const originalReplaceState = history.replaceState

    // Override pushState
    history.pushState = function (...args) {
      startProgress()
      setIsNavigating(true)
      return originalPushState.apply(this, args)
    }

    // Override replaceState
    history.replaceState = function (...args) {
      startProgress()
      setIsNavigating(true)
      return originalReplaceState.apply(this, args)
    }

    // Handle back/forward navigation
    const handlePopState = () => {
      startProgress()
      setIsNavigating(true)
    }

    // Listen for popstate events (browser back/forward)
    window.addEventListener("popstate", handlePopState)

    // Listen for link clicks
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest("a")

      if (
        link &&
        link.href &&
        !link.href.startsWith("mailto:") &&
        !link.href.startsWith("tel:") &&
        !link.target &&
        link.origin === window.location.origin
      ) {
        startProgress()
        setIsNavigating(true)
      }
    }

    document.addEventListener("click", handleLinkClick)

    // Cleanup
    return () => {
      history.pushState = originalPushState
      history.replaceState = originalReplaceState
      window.removeEventListener("popstate", handlePopState)
      document.removeEventListener("click", handleLinkClick)
    }
  }, [])

  // Detect when navigation completes by watching pathname and searchParams
  useEffect(() => {
    if (isNavigating) {
      completeProgress()
      setIsNavigating(false)
    }
  }, [pathname, searchParams, isNavigating])

  // Create custom events for programmatic triggering
  useEffect(() => {
    // Custom event handlers
    const handleRouteChangeStart = () => startProgress()
    const handleRouteChangeComplete = () => completeProgress()

    // Add event listeners
    document.addEventListener("routeChangeStart", handleRouteChangeStart)
    document.addEventListener("routeChangeComplete", handleRouteChangeComplete)

    // Cleanup
    return () => {
      document.removeEventListener("routeChangeStart", handleRouteChangeStart)
      document.removeEventListener("routeChangeComplete", handleRouteChangeComplete)
    }
  }, [])

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: `${height}px`,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      {visible && (
        <div
          style={{
            height: "100%",
            background: color,
            width: `${width}%`,
            transition: `width ${duration}ms ease-in-out`,
          }}
        />
      )}
    </div>
  )
}
