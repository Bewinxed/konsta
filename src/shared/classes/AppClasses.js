import { cls } from '../cls.js';
import { positionClass } from '../position-class.js';

/**
 * Generates CSS classes for the app component based on the current theme and props.
 *
 * @param {Object} props - The props object for the app component.
 * @param {string} currentTheme - The current theme ('ios' or 'material').
 * @param {string|string[]} classes - Additional CSS classes to apply.
 * @returns {string} A string of CSS classes for the app component.
 */
export const AppClasses = (props, currentTheme, classes) => {
  const { safeAreas } = props;
  return cls(
    currentTheme === 'ios' && `k-ios`,
    currentTheme === 'material' && 'k-material',
    'k-app w-full h-full min-h-screen',
    safeAreas && 'safe-areas',
    positionClass('relative', classes),
    classes
  );
};
