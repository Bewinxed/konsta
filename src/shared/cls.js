/**
 * Combines and deduplicates CSS class names from various input types.
 *
 * @param {...*} args - Any number of arguments that can be:
 *   - Strings: Direct class names
 *   - Objects: Keys are class names, truthy values include the class
 *   - Arrays: Nested class names or conditional classes
 *   - Functions: Called to get dynamic class names
 *   - Objects with a 'value' property: The 'value' is used as the class name
 *
 * @returns {string} A space-separated string of unique, truthy class names.
 *
 * @example
 * cls('foo', 'bar', { baz: true, qux: false }, ['quux'], () => 'corge')
 * // Returns: 'foo bar baz quux corge'
 */
export function cls(...args) {
  const classes = [];
  args.forEach((arg) => {
    if (typeof arg === 'object' && arg.constructor === Object) {
      Object.keys(arg).forEach((key) => {
        if (arg[key]) classes.push(key);
      });
    } else if (Array.isArray(arg)) {
      classes.push(...arg);
    } else if (typeof arg === 'function') {
      classes.push(arg());
    } else if (arg && arg.value) {
      classes.push(arg.value);
    } else if (arg) classes.push(arg);
  });
  const uniqueClasses = [];
  classes.forEach((c) => {
    if (uniqueClasses.indexOf(c) < 0) uniqueClasses.push(c);
  });
  return uniqueClasses.filter((c) => !!c).join(' ');
}
