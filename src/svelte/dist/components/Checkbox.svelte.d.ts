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
declare const Checkbox: $$__sveltets_2_IsomorphicComponent<{
    class?: string;
    colors?: any;
    ios?: any;
    material?: any;
    component?: string;
    checked?: boolean;
    indeterminate?: boolean;
    name?: string;
    value?: any;
    disabled?: boolean;
    readonly?: boolean;
    onChange?: () => void;
    touchRipple?: boolean;
    children?: Snippet;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, "">;
type Checkbox = InstanceType<typeof Checkbox>;
export default Checkbox;
