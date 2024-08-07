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
declare const Navbar: $$__sveltets_2_IsomorphicComponent<{
    class?: string;
    bgClass?: string;
    innerClass?: string;
    leftClass?: string;
    titleClass?: string;
    subtitleClass?: string;
    rightClass?: string;
    subnavbarClass?: string;
    colors?: string;
    translucent?: boolean;
    outline?: boolean;
    centerTitle?: boolean;
    medium?: boolean;
    large?: boolean;
    transparent?: boolean;
    fontSizeIos?: string;
    fontSizeMaterial?: string;
    titleFontSizeIos?: string;
    titleFontSizeMaterial?: string;
    titleMediumFontSizeIos?: string;
    titleMediumFontSizeMaterial?: string;
    titleLargeFontSizeIos?: string;
    titleLargeFontSizeMaterial?: string;
    scrollEl?: HTMLElement;
    title?: string;
    subtitle?: string;
    ios?: boolean;
    material?: boolean;
    children?: Snippet;
    leftSlot?: Snippet;
    titleSlot?: Snippet;
    subtitleSlot?: Snippet;
    rightSlot?: Snippet;
    subnavbarSlot?: Snippet;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, "">;
type Navbar = InstanceType<typeof Navbar>;
export default Navbar;
