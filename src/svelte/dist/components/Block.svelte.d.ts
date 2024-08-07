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
declare const Block: $$__sveltets_2_IsomorphicComponent<{
    class?: string;
    colors?: {
        ios?: string;
        material?: string;
    };
    ios?: boolean;
    material?: boolean;
    margin?: string;
    padding?: string;
    inset?: boolean;
    insetIos?: boolean;
    insetMaterial?: boolean;
    strong?: boolean;
    strongIos?: boolean;
    strongMaterial?: boolean;
    outline?: boolean;
    outlineIos?: boolean;
    outlineMaterial?: boolean;
    nested?: boolean;
    children?: Snippet;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, "">;
type Block = InstanceType<typeof Block>;
export default Block;
