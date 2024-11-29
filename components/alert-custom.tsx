import React from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { cn } from "@/lib/utils";

interface AlertCustomProps {
  type: "error" | "warning" | "info" | "success";
  title: string;
  desc?: string;
}

export const AlertCustom: React.FC<AlertCustomProps> = ({
  type,
  title,
  desc,
}) => {
  // Conditionally set the class based on the type
  const alertClass = cn(
    type === "error"
      ? " text-red-500"
      : type === "warning"
      ? " text-yellow-500"
      : type === "success"
      ? " text-green-500"
      : "bg-blue-500", // default to info style
    "p-4 border-none rounded"
  );

  return (
    <Alert className={alertClass}>
      <AlertTitle>{title}!</AlertTitle>
      {desc && <AlertDescription>{desc}</AlertDescription>}
    </Alert>
  );
};
