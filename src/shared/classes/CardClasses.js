import { cls } from '../cls.js';

/**
 * Generates class names for a card component based on provided props and colors.
 *
 * @param {Object} props - The properties for the card component.
 
 * @param {Object} colors - The color classes for various parts of the card.
 * @param {string} colors.bgIos - Background color for iOS.
 * @param {string} colors.textIos - Text color for iOS.
 * @param {string} colors.bgMaterial - Background color for Material design.
 * @param {string} colors.textMaterial - Text color for Material design.
 * @param {string} colors.outlineIos - Outline color for iOS.
 * @param {string} colors.outlineMaterial - Outline color for Material design.
 * @param {string} colors.footerTextIos - Footer text color for iOS.
 * @param {string} colors.footerTextMaterial - Footer text color for Material design.
 * @returns {Object} An object containing class names for different parts of the card.
 */
export const CardClasses = (props, colors) => {
  const { margin, headerDivider, footerDivider, contentWrapPadding } = props;
  return {
    base: {
      common: cls(margin, `overflow-hidden`),
      ios: cls('rounded-lg', colors.bgIos, colors.textIos),
      material: cls('rounded-2xl', colors.bgMaterial, colors.textMaterial),
      plain: '',
      raised: 'shadow',
      outline: {
        common: cls(`border`),
        ios: colors.outlineIos,
        material: colors.outlineMaterial,
      },
    },
    header: {
      common: cls(headerDivider && `border-b`, `p-4`),
      ios: cls(headerDivider && colors.outlineIos, props.headerFontSizeIos),
      material: cls(
        headerDivider && colors.outlineMaterial,
        props.headerFontSizeMaterial
      ),
    },
    content: cls(contentWrapPadding, 'text-sm'),
    footer: {
      common: cls(headerDivider && `border-t`, `text-sm p-4`),
      ios: cls(colors.footerTextIos, footerDivider && colors.outlineIos),
      material: cls(
        colors.footerTextMaterial,
        footerDivider && colors.outlineMaterial
      ),
    },
  };
};
