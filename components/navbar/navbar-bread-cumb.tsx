"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {  EllipsisIcon, Slash } from "lucide-react"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

type BreadcrumbObj = {
    title: string
    href: string
}

export function NavbarBreadCumb() {
    const pathname = usePathname()
    const [open, setOpen] = useState(false)

    // Pisahkan pathname dan buat array objek breadcrumb
    const breadcrumbArray: BreadcrumbObj[] = pathname
        .split("/")
        .filter((segment) => segment !== "")
        .map((segment, index, array) => ({
            title: segment.charAt(0).toUpperCase() + segment.slice(1),
            href: `/${array.slice(0, index + 1).join("/")}`,
        }))

    // Get parent paths (all except the last one)
    const parentPaths = breadcrumbArray.slice(0, -1)

    // Get current page (last item in breadcrumb)
    const currentPage =
        breadcrumbArray.length > 0 ? breadcrumbArray[breadcrumbArray.length - 1] : { title: "Home", href: "/" }

    return (
        <>
            {/* Mobile View (hidden on md and larger screens) */}
            <div className="md:hidden flex items-center">
                {parentPaths.length > 0 ? (
                    <>
                        <DropdownMenu open={open} onOpenChange={setOpen}>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 px-2">
                                    <EllipsisIcon className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-[200px]">
                                <DropdownMenuItem asChild>
                                    <Link href="/">{"/ "}Home</Link>
                                </DropdownMenuItem>
                                {parentPaths.map((item, idx) => (
                                    <DropdownMenuItem key={idx} asChild>
                                        <Link href={item.href}>{"/ "}{item.title}</Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
                ) : (
                    <Link href="/" className="text-sm text-muted-foreground hover:text-foreground mr-2">
                        Home
                    </Link>
                )}
                <span className="font-medium text-sm">{currentPage.title}</span>
            </div>

            {/* Desktop Breadcrumb (hidden on mobile) */}
            <div className="hidden md:block">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <Link href="/">Home</Link>
                        </BreadcrumbItem>
                        {breadcrumbArray.map((bread, idx) => (
                            <div key={idx} className="flex justify-center items-center">
                                <BreadcrumbSeparator>
                                    <Slash />
                                </BreadcrumbSeparator>
                                <BreadcrumbItem className="text-sm md:text-base hover:cursor-pointer">
                                    {bread.title === currentPage.title ? (
                                        <BreadcrumbPage>{" "}{bread.title}</BreadcrumbPage>
                                    ) : (
                                        <Link href={bread.href}>{" "} {bread.title}</Link>
                                    )}
                                </BreadcrumbItem>
                            </div>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </>
    )
}

