import { Header } from "@/components/header";
import React from "react";

interface IWrapper {
  children: React.ReactNode;
  title?: string;
  desc?: string;
  className?: string;
}

export const TicketContainer: React.FC<IWrapper> = ({
  children,
  title,
  desc,
  className,
}) => {
  return (
    <div className={`px-2 md:px-2 pb-24 w-full ${className ?? ""}`}>
      <div className=" w-full pt-0 max-w-full  md:my-5 space-y-4 gap-6">
        <Header title={title} desc={desc} />
        {/* Flex grid here */}
        <div className="">
          <div className=" w-full  md:w-full flex flex-col lg:flex-row lg:flex-wrap space-4">
            {children}

          </div>
        </div>
      </div>
    </div>
  );
};

