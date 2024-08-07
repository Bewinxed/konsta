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
declare const Range: $$__sveltets_2_IsomorphicComponent<{
    class?: string;
    colors?: string;
    ios?: boolean;
    material?: boolean;
    inputId?: string;
    name?: string;
    value?: any;
    readonly?: boolean;
    disabled?: boolean;
    step?: number;
    min?: number;
    max?: number;
    onInput?: (e: any) => void;
    onChange?: (e: any) => void;
    onFocus?: (e: any) => void;
    onBlur?: (e: any) => void;
    children?: Snippet;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, "">;
type Range = InstanceType<typeof Range>;
export default Range;
