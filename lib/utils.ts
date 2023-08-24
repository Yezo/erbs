import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const calculateCurrentLP = (value: number | undefined) => {
  if (value) {
    if (value >= 6000) {
      return `${value - 6000} RP`
    }
    if (value >= 4000 && value <= 5999) {
      return `${value - 4000} RP`
    }
    if (value >= 2000 && value <= 3999) {
      return `${value - 2000} RP`
    }
  }
  return `${value} RP`
}

export const calculateTop3Percentage = (value: number | undefined) => {
  if (value) {
    return `${(value * 100).toFixed(1)}%`
  }
  return 0
}

export const calculateWinPercentage = (wins: number | undefined, games: number | undefined) => {
  if (wins && games) {
    return `${((wins / games) * 100).toFixed(1)}%`
  }
  return 0
}

export const calculateMostPlayedCharacterUsageRate = (
  games: number | undefined,
  total: number | undefined
) => {
  if (games && total) {
    return `${((games / total) * 100).toFixed(1)}%`
  }
  return 0
}
