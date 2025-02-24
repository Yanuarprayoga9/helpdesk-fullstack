"use client"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link";

import { usePathname } from "next/navigation";

type BreadcrumbObj = {
    title: string;
    href: string;
};

export function BreadcrumbDemo() {
    const pathname = usePathname();

    // Pisahkan pathname dan buat array objek breadcrumb
    const breadcrumbArray: BreadcrumbObj[] = pathname
        .split("/")
        .filter((segment) => segment !== "")
        .map((segment, index, array) => ({
            title: segment,
            href: `/${array.slice(0, index + 1).join("/")}`,
        }));

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {
                    breadcrumbArray.map((bread, idx) => (
                        <div key={idx} className="flex justify-center items-center space-x-2">
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                {
                                    bread.title == breadcrumbArray[breadcrumbArray.length - 1].title ? (
                                        <BreadcrumbPage>{bread.title}</BreadcrumbPage>
                                    ) : (
                                        <Link href={bread.href}>{bread.title}</Link>

                                    )
                                }
                            </BreadcrumbItem>
                        </div>
                    ))
                }


            </BreadcrumbList>
        </Breadcrumb>
    )
}
