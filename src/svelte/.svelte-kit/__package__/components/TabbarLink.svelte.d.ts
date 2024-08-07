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
declare const TabbarLink: $$__sveltets_2_IsomorphicComponent<{
    class?: string;
    colors?: string;
    ios?: boolean;
    material?: boolean;
    linkProps?: any;
    active?: boolean;
    label?: string;
    children: Snippet;
    iconSlot?: Snippet;
    labelSlot?: Snippet;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, "">;
type TabbarLink = InstanceType<typeof TabbarLink>;
export default TabbarLink;
