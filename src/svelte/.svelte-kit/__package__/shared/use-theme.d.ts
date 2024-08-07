/**
 * A hook to manage theme selection based on props and KonstaStore.
 *
 * @param {Record<string, any>|Function} props - Either an object with theme preferences or a callback function.
 * @param {boolean} [props.ios] - Flag to force iOS theme.
 * @param {boolean} [props.material] - Flag to force Material theme.
 * @param {Function} [cb] - Callback function to be called when theme changes.
 * @returns {string} The calculated theme ('ios' or 'material').
 */
declare const useTheme: (props: Record<string, any> | Function, cb: Function) => string;
export { useTheme };
