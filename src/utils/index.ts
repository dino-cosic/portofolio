// Utility functions
export const cn = (
  ...classes: (string | undefined | null | false)[]
): string => {
  return classes.filter(Boolean).join(' ');
};

export { calculateYearsOfExperience, getCurrentYear } from './dateUtils';

