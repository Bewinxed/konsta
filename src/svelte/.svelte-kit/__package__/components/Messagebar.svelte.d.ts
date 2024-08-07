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
declare const Messagebar: $$__sveltets_2_IsomorphicComponent<{
    class?: string;
    colors?: string;
    ios?: boolean;
    material?: boolean;
    component?: string;
    id?: string;
    name?: string;
    placeholder?: string;
    value?: string;
    outline?: boolean;
    leftClass?: string;
    rightClass?: string;
    style?: string;
    textareaId?: string;
    disabled?: boolean;
    size?: string;
    children?: Snippet;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    left: {};
    right: {};
}, {}, "">;
type Messagebar = InstanceType<typeof Messagebar>;
export default Messagebar;
