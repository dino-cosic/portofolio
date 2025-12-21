// Cache for memoization to avoid creating new Date objects unnecessarily
let cachedYear: number | null = null;
let cachedMonth: number | null = null;
let lastCheck: number = 0;

/**
 * Get current date with caching (1-minute cache to optimize performance)
 * This prevents excessive Date object creation while keeping data fresh
 */
function getCachedDate(): { year: number; month: number } {
  const now = Date.now();
  // Cache for 60 seconds
  if (cachedYear !== null && cachedMonth !== null && now - lastCheck < 60000) {
    return { year: cachedYear, month: cachedMonth };
  }
  
  const currentDate = new Date();
  cachedYear = currentDate.getFullYear();
  cachedMonth = currentDate.getMonth() + 1; // JavaScript months are 0-indexed
  lastCheck = now;
  
  return { year: cachedYear, month: cachedMonth };
}

/**
 * Calculate years of experience based on a start date.
 * The calculation considers full calendar years only (January to January).
 * 
 * @param startYear - The year when experience started (e.g., 2018)
 * @param startMonth - The month when experience started (1-12, default: 1)
 * @returns The number of full years of experience
 * 
 * @example
 * // Started in January 2018, current date is December 2025
 * calculateYearsOfExperience(2018, 1); // Returns 7
 * 
 * @example
 * // Started in October 2019, current date is December 2025
 * calculateYearsOfExperience(2019, 10); // Returns 6
 */
export function calculateYearsOfExperience(startYear: number, startMonth: number = 1): number {
  const { year: currentYear, month: currentMonth } = getCachedDate();
  
  let years = currentYear - startYear;
  
  // If we haven't reached the start month yet this year, subtract 1
  if (currentMonth < startMonth) {
    years -= 1;
  }
  
  return Math.max(0, years); // Ensure we never return negative years
}

/**
 * Get the current year
 * @returns The current year (cached for performance)
 */
export function getCurrentYear(): number {
  return getCachedDate().year;
}
