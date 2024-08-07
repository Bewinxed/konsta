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
declare const MenuListItem: $$__sveltets_2_IsomorphicComponent<{
    active?: boolean;
    href?: boolean | string;
    titleSlot?: Snippet;
    subtitleSlot?: Snippet;
    mediaSlot?: Snippet;
    headerSlot?: Snippet;
    innerSlot?: Snippet;
    contentSlot?: Snippet;
    textSlot?: Snippet;
    footerSlot?: Snippet;
    afterSlot?: Snippet;
    children?: Snippet;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, "">;
type MenuListItem = InstanceType<typeof MenuListItem>;
export default MenuListItem;
