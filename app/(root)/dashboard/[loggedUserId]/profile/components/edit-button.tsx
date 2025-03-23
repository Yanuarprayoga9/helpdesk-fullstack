"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EditProfileButton() {
    const pathname = usePathname();
    const isEditPage = pathname.endsWith("/edit");

    return (
        <Button
            variant="outline"
            className="w-full md:w-auto bg-main-green"
            disabled={isEditPage}
        >
            {isEditPage ? "Edit Profile" : <Link href={`${pathname}/edit`}>Edit Profile</Link>}
        </Button>
    );
}
