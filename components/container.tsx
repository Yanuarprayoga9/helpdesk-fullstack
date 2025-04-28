import React from "react";
import { Header } from "./header";

interface IWrapper {
  children: React.ReactNode;
  title?: string;
  desc?: string;
  className?: string;
}

export const Container: React.FC<IWrapper> = ({
  children,
  title,
  desc,
  className,
}) => {
  return (
    <main className={`w-full ${className ?? ""}`}>
      <div className="mx-4 w-full pt-0 max-w-full md:max-w-7xl md:my-5 flex flex-col justify-center items-center   gap-6">
        {title && <Header title={title} desc={desc} />}
        {/* Flex grid here */}
        <div className="w-full mx-auto gap-4">
          {children}
        </div>
      </div>
    </main>
  );
};
