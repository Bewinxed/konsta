import { cls } from '../cls.js';

/**
 * Generates color classes for a link component based on provided props and colors.
 *
 * @param {Object} props - The properties for the link component.
 * @param {string} [props.textIos] - Text color for iOS.
 * @param {string} [props.textMaterial] - Text color for Material design.
 * @param {string} [props.navbarTextIos] - Text color for navbar in iOS.
 * @param {string} [props.navbarTextMaterial] - Text color for navbar in Material design.
 * @param {Object} colors - The color classes for various parts of the link.
 * @param {string} colors.textIos - Text color for iOS.
 * @param {string} colors.textMaterial - Text color for Material design.
 * @param {string} colors.navbarTextIos - Text color for navbar in iOS.
 * @param {string} colors.navbarTextMaterial - Text color for navbar in Material design.
 * @param {Function} dark - Function to generate dark mode classes.
 * @returns {Object} An object containing color classes for different parts of the link.
 */
export const LinkColors = (colorsProp = {}, dark) => {
  return {
    textIos: 'text-primary',
    textMaterial: cls(
      'text-md-light-primary',
      dark('dark:text-md-dark-primary')
    ),
    navbarTextIos: 'text-primary',
    navbarTextMaterial: '',
    ...colorsProp,
  };
};
