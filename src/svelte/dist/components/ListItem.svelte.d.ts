import type { Snippet, Component } from '../types/svelte.js';
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
declare const ListItem: $$__sveltets_2_IsomorphicComponent<{
    class?: string;
    colors?: string;
    ios?: boolean;
    material?: boolean;
    component?: string | Component;
    mediaClass?: string;
    innerClass?: string;
    contentClass?: string;
    titleWrapClass?: string;
    titleFontSizeIos?: string;
    titleFontSizeMaterial?: string;
    withMedia?: boolean;
    withTitle?: boolean;
    title?: string;
    subtitle?: string;
    text?: string;
    after?: string;
    header?: string;
    footer?: string;
    menuListItem?: boolean;
    menuListItemActive?: boolean;
    groupTitle?: boolean;
    strongTitle?: boolean | "auto";
    label?: boolean;
    chevron?: boolean;
    chevronIos?: boolean;
    chevronMaterial?: boolean;
    href?: boolean | string;
    target?: string;
    dividers?: boolean;
    contacts?: string | boolean;
    link?: boolean;
    linkComponent?: string | Component;
    linkProps?: any;
    touchRipple?: boolean;
    headerSlot?: Snippet;
    innerSlot?: Snippet;
    contentSlot?: Snippet;
    mediaSlot: Snippet;
    titleSlot: Snippet;
    subtitleSlot: Snippet;
    textSlot: Snippet;
    footerSlot: Snippet;
    afterSlot: Snippet;
    onClick?: (e: any) => void;
    children?: Snippet;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, "">;
type ListItem = InstanceType<typeof ListItem>;
export default ListItem;
