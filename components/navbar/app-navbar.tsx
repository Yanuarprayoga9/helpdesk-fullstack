"use client";
import React, { useEffect, useState } from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { NavbarBreadCumb } from "./navbar-bread-cumb";
import { Separator } from "../ui/separator";
import { ModeToggle } from "../theme-toggle";
import { UserType } from "@/@types/user";
import { UserNav } from "./navbar-user-nav";

interface AppNavbarProps {
  user?: UserType;
}

const AppNavbar: React.FC<AppNavbarProps> = ({ user }) => {
  const [screenWidth, setScreenWidth] = useState<number>(0);

  useEffect(() => {
    const updateWidth = () => setScreenWidth(window.innerWidth);
    updateWidth(); // initial
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Tentukan max-w- class secara dinamis
  const headerMaxWidthClass =
    screenWidth > 0 ? `max-w-[${screenWidth}px]` : "max-w-full";
  return (
    <header
      className={`sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b px-1 ${headerMaxWidthClass}`}
    >
      <div className="flex items-center py-4 mx-auto w-full px-2">
        <div className="flex gap-2">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
          <NavbarBreadCumb />
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <UserNav user={user} />
        </div>
      </div>
    </header>
  );
};

export default AppNavbar;
