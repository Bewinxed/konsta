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
declare const Message: $$__sveltets_2_IsomorphicComponent<{
    class?: string;
    colors?: string;
    ios?: boolean;
    material?: boolean;
    component?: string;
    id?: string;
    text?: string;
    name?: string;
    type?: string;
    header?: string;
    footer?: string;
    textHeader?: string;
    textFooter?: string;
    avatar?: string;
    onClick?: (e: any) => void;
    children?: Snippet;
    avatarSlot?: Snippet;
    nameSlot?: Snippet;
    headerSlot?: Snippet;
    textHeaderSlot?: Snippet;
    textFooterSlot?: Snippet;
    textSlot?: Snippet;
    footerSlot?: Snippet;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, "">;
type Message = InstanceType<typeof Message>;
export default Message;
