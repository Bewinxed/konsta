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
declare const Actions: $$__sveltets_2_IsomorphicComponent<{
    class?: string;
    ios?: boolean;
    material?: boolean;
    opened?: boolean;
    backdrop?: boolean;
    children: Snippet;
    onBackdropClick?: () => void;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, "">;
type Actions = InstanceType<typeof Actions>;
export default Actions;
