/**
 * @module KonstaThemeUtils
 */
import { get } from 'svelte/store';
import { KonstaStore } from './KonstaStore.js';
import { cls } from '../../shared/cls.js';

/**
 * Processes and combines class names based on theme and state.
 * @param {Object|string} classesObj - Object containing class names or a string of class names.
 * @param {string} theme - The current theme ('ios' or 'material').
 * @param {string} [state] - The current state, if applicable.
 * @returns {string[]} An array of class names.
 */
const propClasses = (classesObj, theme, state) => {
  if (typeof classesObj === 'string') return classesObj;
  const arr = [classesObj.common, classesObj[theme]];
  if (state && classesObj[state]) {
    if (typeof classesObj[state] === 'string') arr.push(classesObj[state]);
    else {
      arr.push(classesObj[state].common, classesObj[state][theme]);
    }
  }
  return arr;
};

/**
 * Generates theme-specific classes.
 * @param {Object} classesObj - Object containing class definitions.
 * @param {string} theme - The current theme ('ios' or 'material').
 * @param {string} [addBaseClassName] - Additional base class name to be added.
 * @returns {Object} An object with processed class names.
 */
const themeClasses = (classesObj, theme, addBaseClassName) => {
  const c = {};
  const themeSubKeys = ['common', 'ios', 'material'];

  Object.keys(classesObj).forEach((key) => {
    const addBaseClass = key === 'base' ? addBaseClassName : '';
    const hasStates =
      typeof classesObj[key] !== 'string' &&
      Object.keys(classesObj[key]).filter(
        (stateKey) => !themeSubKeys.includes(stateKey)
      ).length > 0;

    if (!hasStates) {
      c[key] = cls(propClasses(classesObj[key], theme), addBaseClass);
      return;
    }

    c[key] = {};
    const defaultStateClasses = propClasses(classesObj[key], theme);
    c[key].default = cls(defaultStateClasses, addBaseClass);

    Object.keys(classesObj[key])
      .filter((stateKey) => !themeSubKeys.includes(stateKey))
      .forEach((stateKey) => {
        c[key][stateKey] = cls(
          defaultStateClasses,
          propClasses(classesObj[key], theme, stateKey),
          addBaseClass
        );
      });
  });

  return c;
};

/**
 * Hook for using theme classes in components.
 * @param {Object} props - Component props.
 * @param {Object|Function} classesObj - Object or function returning object with class definitions.
 * @param {Function} [cb] - Callback function to be called when theme changes.
 * @param {string} [addBaseClassName=''] - Additional base class name to be added.
 * @returns {Object} An object with processed theme classes.
 */
const useThemeClasses = (props, classesObj, cb, addBaseClassName = '') => {
  let theme = get(KonstaStore).theme;
  const calcClasses = () => {
    return themeClasses(
      typeof classesObj === 'function' ? classesObj() : classesObj,
      theme,
      addBaseClassName
    );
  };
  if (props.ios) theme = 'ios';
  else if (props.material) theme = 'material';
  else {
    KonstaStore.subscribe((context) => {
      theme = context.theme || 'ios';
      if (cb) {
        cb(calcClasses());
      }
    });
  }
  return calcClasses();
};

export { useThemeClasses };
