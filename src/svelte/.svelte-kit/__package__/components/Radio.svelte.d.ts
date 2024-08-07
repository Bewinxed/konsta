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
declare const Radio: $$__sveltets_2_IsomorphicComponent<{
    class?: string;
    colors?: string;
    ios?: boolean;
    material?: boolean;
    component?: string;
    checked?: boolean;
    name?: string;
    value?: any;
    disabled?: boolean;
    readonly?: boolean;
    onChange?: (e: any) => void;
    touchRipple?: boolean;
    children?: Snippet;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, "">;
type Radio = InstanceType<typeof Radio>;
export default Radio;
