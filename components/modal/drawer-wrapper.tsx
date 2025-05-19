"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

type DrawerWrapperProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
};

export const DrawerWrapper = ({
  open,
  onClose,
  title,
  description,
  children,
}: DrawerWrapperProps) => {
  return (
    <Drawer open={open} onOpenChange={(val) => !val && onClose()}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-xl">
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            {description && <DrawerDescription>{description}</DrawerDescription>}
          </DrawerHeader>

          <div className="p-4">{children}</div>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
