import { cls } from '../cls.js';

/**
 * Generates color classes for action buttons based on the provided color properties and dark mode setting.
 *
 * @param {Object} [colorsProp={}] - Custom color properties to override default colors.
 * @param {Function} dark - Function to generate dark mode classes.
 * @returns {Object} An object containing color classes for different themes and states.
 * @property {string} bgIos - Background color class for iOS theme.
 * @property {string} bgMaterial - Background color class for Material theme.
 * @property {string} activeBgIos - Active state background color class for iOS theme.
 * @property {string} activeBgMaterial - Active state background color class for Material theme (empty by default).
 * @property {string} textIos - Text color class for iOS theme.
 * @property {string} textMaterial - Text color class for Material theme.
 */
export const ActionsButtonColors = (colorsProp = {}, dark) => {
  return {
    bgIos: cls('bg-white', dark('dark:bg-neutral-800')),
    bgMaterial: cls('bg-md-light-surface-3', dark('dark:bg-md-dark-surface-3')),
    activeBgIos: cls(
      'active:bg-neutral-200',
      dark('dark:active:bg-neutral-700')
    ),
    activeBgMaterial: '',
    textIos: 'text-primary',
    textMaterial: cls(
      'text-md-light-on-surface',
      dark('dark:text-md-dark-on-surface')
    ),
    ...colorsProp,
  };
};
