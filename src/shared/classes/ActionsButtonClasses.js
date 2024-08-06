import { cls } from '../cls.js';

/**
 * Generates classes for action buttons based on the provided props and theme.
 *
 * @param {Object} props - The properties for the action button.
 * @param {string} props.fontSizeIos - The font size for iOS theme.
 * @param {string} props.fontSizeMaterial - The font size for Material theme.
 * @param {boolean} props.bold - Whether the text should be bold.
 * @param {boolean} props.dividers - Whether to include dividers between buttons.
 * @param {Object} colors - The color classes for different themes and states.
 * @param {string} colors.textIos - Text color for iOS theme.
 * @param {string} colors.bgIos - Background color for iOS theme.
 * @param {string} colors.activeBgIos - Active background color for iOS theme.
 * @param {string} colors.textMaterial - Text color for Material theme.
 * @param {string} colors.bgMaterial - Background color for Material theme.
 * @param {string} colors.activeBgMaterial - Active background color for Material theme.
 * @param {Function} darkClasses - Function to generate dark mode classes.
 * @returns {Object} An object containing the base classes for the action button.
 */
export const ActionsButtonClasses = (props, colors, darkClasses) => {
  const { fontSizeIos, fontSizeMaterial, bold, dividers } = props;
  return {
    base: {
      /**
       * Common classes for both iOS and Material themes.
       */
      common: cls(
        `flex items-center w-full px-4 relative z-10 overflow-hidden`,
        dividers && 'hairline-b'
      ),
      /**
       * Classes specific to iOS theme.
       */
      ios: cls(
        `h-14`,
        colors.textIos,
        colors.bgIos,
        colors.activeBgIos,
        fontSizeIos,
        'first:rounded-t-xl last:rounded-b-xl justify-center',
        bold && 'font-semibold'
      ),
      /**
       * Classes specific to Material theme.
       */
      material: cls(
        `h-12`,
        colors.textMaterial,
        colors.bgMaterial,
        colors.activeBgMaterial,
        fontSizeMaterial,
        'justify-start',
        darkClasses('dark:touch-ripple-white'),
        bold && 'font-medium'
      ),
    },
  };
};
