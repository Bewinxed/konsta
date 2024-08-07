/**
 * Hook for using theme classes in components.
 * @param {Record<string, any>} props - Component props.
 * @param {Object|Function} classesObj - Object or function returning object with class definitions.
 * @param {Function} [cb] - Callback function to be called when theme changes.
 * @param {string} [addBaseClassName=''] - Additional base class name to be added.
 * @returns {Record<string, any>} An object with processed theme classes.
 */
declare const useThemeClasses: (props: {
    ios?: any;
    material?: any;
}, classesObj: Record<string, any> | Function, cb: Function | undefined, addBaseClassName?: string) => Record<string, any>;
export { useThemeClasses };
