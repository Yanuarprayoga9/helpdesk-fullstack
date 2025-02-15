import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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

