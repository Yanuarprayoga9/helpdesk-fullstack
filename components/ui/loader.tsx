import type { HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

export interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
  size?: "xs" | "sm" | "md" | "lg"
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | string
  className?: string
}

export function Loader({ size = "sm", color = "default", className, ...props }: LoaderProps) {
  const selectedSize =
    size === "xs"
      ? "h-3 w-3 border-[3px]"
      : size === "sm"
        ? "h-4 w-4 border-[4px]"
        : size === "md"
          ? "h-6 w-6 border-[5px]"
          : "h-8 w-8 border-[6px]"

  const selectedColor =
    color === "default"
      ? "border-default"
      : color === "primary"
        ? "border-primary"
        : color === "secondary"
          ? "border-secondary"
          : color === "success"
            ? "border-success"
            : color === "warning"
              ? "border-warning"
              : color === "danger"
                ? "border-destructive"
                : `border-${color}`

  return (
    <div
      className={cn("inline-block rounded-full border-solid animate-spin", selectedSize, selectedColor, className)}
      role="status"
      aria-label="Loading"
      {...props}
    />
  )
}
