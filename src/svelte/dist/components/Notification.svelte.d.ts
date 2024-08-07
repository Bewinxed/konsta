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
declare const Notification: $$__sveltets_2_IsomorphicComponent<{
    class?: string;
    colors?: string;
    ios?: boolean;
    material?: boolean;
    translucent?: boolean;
    onClick?: (e: any) => void;
    onClose?: (e: any) => void;
    button?: boolean;
    title?: string;
    titleRightText?: string;
    subtitle?: string;
    text?: string;
    children?: Snippet;
    iconSlot?: Snippet;
    titleSlot?: Snippet;
    titleRightTextSlot?: Snippet;
    subtitleSlot?: Snippet;
    textSlot?: Snippet;
    buttonSlot?: Snippet;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, "">;
type Notification = InstanceType<typeof Notification>;
export default Notification;
