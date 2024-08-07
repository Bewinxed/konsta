/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { get } from 'svelte/store';
import { KonstaStore } from './KonstaStore.js';
/**
 * A hook to manage theme selection based on props and KonstaStore.
 *
 * @param {Record<string, any>|Function} props - Either an object with theme preferences or a callback function.
 * @param {boolean} [props.ios] - Flag to force iOS theme.
 * @param {boolean} [props.material] - Flag to force Material theme.
 * @param {Function} [cb] - Callback function to be called when theme changes.
 * @returns {string} The calculated theme ('ios' or 'material').
 */
const useTheme = (props, cb) => {
    let ios;
    let material;
    if (typeof props === 'function') {
        cb = props;
        props = {};
    }
    else {
        ios = props.ios;
        material = props.material;
    }
    /**
     * Calculates the theme based on context and props.
     *
     * @param {Object} ctx - The context object from KonstaStore.
     * @param {string} [ctx.theme] - The theme from the context.
     * @returns {string} The calculated theme ('ios' or 'material').
     */
    const calcTheme = (ctx) => {
        let theme = ctx.theme || 'ios';
        if (ios)
            theme = 'ios';
        if (material)
            theme = 'material';
        return theme;
    };
    if (cb) {
        KonstaStore.subscribe((newValue) => {
            cb(calcTheme(newValue));
        });
    }
    return calcTheme(get(KonstaStore));
};
export { useTheme };
