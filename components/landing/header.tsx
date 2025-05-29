"use client"

import { Button } from "@/components/ui/button"
import { Ticket, Menu, X } from "lucide-react"
import { useState } from "react"
import { ModeToggle } from "../theme-toggle"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { TICKETS_ROUTE } from "@/constants/routes"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const session = useSession()

  const isLoggedIn = Boolean(session.data?.user?.id)

  const textLoginBtn = isLoggedIn ? session.data?.user.name : "Login"

  const redirectTo = isLoggedIn ? TICKETS_ROUTE : "/login";


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <Ticket className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Helpdesk Ticketing System</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
            Benefits
          </a>
          <a href="#roles" className="text-sm font-medium hover:text-primary transition-colors">
            Team Roles
          </a>
          <a href="#benefits" className="text-sm font-medium hover:text-primary transition-colors">
            Why Choose Us
          </a>
          <Button variant="outline" size="sm">
            Get Started
          </Button>
          <Link href={redirectTo} >
            <Button variant="outline" size="sm" className="w-full" >
              {
                textLoginBtn
              }

            </Button>
          </Link>
          <ModeToggle />
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-2">
          <ModeToggle />
          <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container py-4 space-y-3">
            <a href="#features" className="block text-sm font-medium hover:text-primary transition-colors">
              Benefits
            </a>
            <a href="#roles" className="block text-sm font-medium hover:text-primary transition-colors">
              Team Roles
            </a>
            <a href="#benefits" className="block text-sm font-medium hover:text-primary transition-colors">
              Why Choose Us
            </a>
            <Button variant="outline" size="sm" className="w-full">
              Get Started
            </Button>
            <Link href={redirectTo} >
              <Button variant="outline" size="sm" className="w-full" >
                {
                  textLoginBtn
                }

              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
