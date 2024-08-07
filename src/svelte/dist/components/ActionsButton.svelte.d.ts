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
declare const ActionsButton: $$__sveltets_2_IsomorphicComponent<{
    class?: string;
    colors?: {
        ios?: string;
        material?: string;
    };
    component?: string;
    ios?: boolean;
    material?: boolean;
    href?: string;
    target?: string;
    bold?: boolean;
    boldIos?: boolean;
    boldMaterial?: boolean;
    fontSizeIos?: string;
    fontSizeMaterial?: string;
    touchRipple?: boolean;
    dividers?: boolean;
    children?: Snippet;
    onClick?: () => void;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, "">;
type ActionsButton = InstanceType<typeof ActionsButton>;
export default ActionsButton;
