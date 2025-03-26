import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatStringRoles = (roles: string[] | undefined) => {
  if (roles == undefined)
    return null
  if (roles.length === 0) return "";
  if (roles.length === 1) return roles[0];

  const lastRole = roles.pop();
  return `${roles.join(", ")} and ${lastRole}`;
};

// Helper function to format dates that could be strings or Date objects
export const formatDate = (date: Date | string) => {
    if (typeof date === "string") {
        return format(new Date(date), "MMM d, yyyy")
    }
    return format(date, "MMM d, yyyy")
}