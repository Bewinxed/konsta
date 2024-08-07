import type { Component } from 'svelte';
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
declare const Card: $$__sveltets_2_IsomorphicComponent<{
    component?: string | Component;
    class?: string;
    colors?: any;
    ios?: any;
    material?: any;
    margin?: string;
    header?: string;
    footer?: string;
    contentWrap?: boolean;
    contentWrapPadding?: string;
    raised?: boolean;
    raisedIos?: boolean;
    raisedMaterial?: boolean;
    outline?: boolean;
    outlineIos?: boolean;
    outlineMaterial?: boolean;
    headerDivider?: boolean;
    footerDivider?: boolean;
    children?: Snippet;
    headerSlot?: Snippet;
    footerSlot?: Snippet;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, "">;
type Card = InstanceType<typeof Card>;
export default Card;
