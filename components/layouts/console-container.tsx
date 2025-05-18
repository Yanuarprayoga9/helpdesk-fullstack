import React from "react";
import { Header } from "../header";

interface IWrapper {
  children: React.ReactNode;
  title?: string;
  desc?: string;
  className?: string;
}

export const ConsoleContainer: React.FC<IWrapper> = ({
  children,
  title,
  desc,
  className,
}) => {
  return (
    <div className={`px-2 md:px-8 pb-24 w-full ${className ?? ""}`}>
      <div className=" w-full pt-0 max-w-full md:max-w-7xl md:my-5 space-y-4 gap-6">
        <Header title={title} desc={desc} />
        {/* Flex grid here */}
        <div className="">
          <div className="overflow-scroll w-full  md:w-full flex flex-col lg:flex-row lg:flex-wrap space-4">
                      {children}

          </div>
        </div>
      </div>
    </div>
  );
};

