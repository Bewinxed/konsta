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
declare const Dialog: $$__sveltets_2_IsomorphicComponent<{
    class?: string;
    colors?: any;
    ios?: any;
    material?: any;
    translucent?: boolean;
    sizeIos?: string;
    sizeMaterial?: string;
    titleFontSizeIos?: string;
    titleFontSizeMaterial?: string;
    opened?: boolean;
    backdrop?: boolean;
    onBackdropClick?: () => void;
    title?: Snippet;
    buttons?: Snippet;
    children?: Snippet;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, "">;
type Dialog = InstanceType<typeof Dialog>;
export default Dialog;
