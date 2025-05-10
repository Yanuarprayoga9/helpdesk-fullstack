import React from "react";
import { Header } from "../header";

interface IWrapper {
  children: React.ReactNode;
  headerChildren?: React.ReactNode;
  title?: string;
  desc?: string;
  className?: string;
  variant?: "default" | "sub";
}

export const ConsoleWrapper: React.FC<IWrapper> = ({
  children,
  title,
  desc,
  className,
  headerChildren
}) => {
  return (
    <div className={`w-full ${className ?? ""}`}>
      <div className="p-6 border shadow-md rounded-md w-full  ">
        {title && (
          <Header title={title} desc={desc} variant={"sub"} >  {headerChildren}     </Header>

        )}
        {children}
      </div>
    </div>
  );
};
