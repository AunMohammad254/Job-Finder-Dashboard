import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Build up-to-two-letter uppercase initials from a name.
 * Safe on empty/undefined input. Shared by JobCard, JobDetails, AdminDashboard.
 */
export function getInitials(name) {
  if (!name) return ""
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}
