import { get } from 'svelte/store';
import { KonstaStore } from './KonstaStore.js';

/**
 * A hook that returns a function to conditionally apply dark mode classes.
 *
 * @returns {Function} A function that conditionally returns dark mode classes.
 */
const useDarkClasses = () => {
  /**
   * Conditionally returns dark mode classes based on the current state of KonstaStore.
   *
   * @param {string} classNames - The dark mode classes to be applied.
   * @returns {string} The provided classNames if dark mode is active, otherwise an empty string.
   */
  return (classNames) => {
    const context = get(KonstaStore);
    if (!context.dark) return '';
    return classNames;
  };
};

export { useDarkClasses };
