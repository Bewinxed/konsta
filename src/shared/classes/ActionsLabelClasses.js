import { cls } from '../cls.js';

/**
 * Generates classes for action labels in iOS and Material Design styles.
 *
 * @param {Object} props - The properties for customizing the action label.
 * @returns {Object} An object containing the generated classes for the action label.
 * @returns {Object} return.base - The base classes for the action label.
 * @returns {string} return.base.common - Common classes for both iOS and Material Design.
 * @returns {string} return.base.ios - Classes specific to iOS style.
 * @returns {string} return.base.material - Classes specific to Material Design style.
 */
export const ActionsLabelClasses = (props, colors) => {
  const { fontSizeIos, fontSizeMaterial, dividers } = props;
  return {
    base: {
      common: cls(
        `flex items-center w-full px-4 relative z-10 overflow-hidden ${colors.activeBg}`,
        dividers && 'hairline-b'
      ),
      ios: cls(
        `h-14`,
        colors.bgIos,
        colors.textIos,
        fontSizeIos,
        'first:rounded-t-xl last:rounded-b-xl justify-center'
      ),
      material: cls(
        `h-12`,
        colors.bgMaterial,
        colors.textMaterial,
        fontSizeMaterial,
        'font-medium',
        'justify-start'
      ),
    },
  };
};
