import type { Snippet } from '../types/svelte.js';
interface $$__sveltets_2_IsomorphicComponent<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any, Exports = {}, Bindings = string> {
    new (options: import('svelte').ComponentConstructorOptions<Props>): import('svelte').SvelteComponent<Props, Events, Slots> & {
        $$bindings?: Bindings;
    } & Exports;
    (internal: unknown, props: Props & {
        $$events?: Events;
        $$slots?: Slots;
    }): Exports & {
        $set?: any;
        $on?: any;
    };
    z_$$bindings?: Bindings;
}
declare const Searchbar: $$__sveltets_2_IsomorphicComponent<{
    class?: string;
    colors?: string;
    ios?: boolean;
    material?: boolean;
    component?: string;
    placeholder?: string;
    value?: any;
    inputId?: string;
    inputStyle?: any;
    disableButton?: boolean;
    disableButtonText?: string;
    clearButton?: boolean;
    onInput?: (e?: any) => void;
    onChange?: (e?: any) => void;
    onFocus?: (e?: any) => void;
    onBlur?: (e?: any) => void;
    onClear?: (e?: any) => void;
    onDisable?: (e?: any) => void;
    touchRipple?: boolean;
    children?: Snippet;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, "">;
type Searchbar = InstanceType<typeof Searchbar>;
export default Searchbar;
