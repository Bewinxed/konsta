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
declare const ActionsLabel: $$__sveltets_2_IsomorphicComponent<{
    class?: string;
    colors?: {
        ios?: string;
        material?: string;
    };
    ios?: boolean;
    material?: boolean;
    fontSizeIos?: string;
    fontSizeMaterial?: string;
    dividers?: boolean;
    children: Snippet;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, "">;
type ActionsLabel = InstanceType<typeof ActionsLabel>;
export default ActionsLabel;
