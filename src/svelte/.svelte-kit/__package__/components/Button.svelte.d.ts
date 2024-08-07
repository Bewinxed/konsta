import { type Component } from 'svelte';
import type { Snippet } from '../types/svelte.js';
import type { HTMLButtonAttributes, MouseEventHandler } from 'svelte/elements';
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
declare const Button: $$__sveltets_2_IsomorphicComponent<{
    class?: string;
    colors?: string;
    ios?: boolean;
    material?: boolean;
    component?: string | Component;
    href?: string;
    disabled?: boolean;
    outline?: boolean;
    outlineIos?: boolean;
    outlineMaterial?: boolean;
    clear?: boolean;
    clearIos?: boolean;
    clearMaterial?: boolean;
    tonal?: boolean;
    tonalIos?: boolean;
    tonalMaterial?: boolean;
    rounded?: boolean;
    roundedIos?: boolean;
    roundedMaterial?: boolean;
    small?: boolean;
    smallIos?: boolean;
    smallMaterial?: boolean;
    large?: boolean;
    largeIos?: boolean;
    largeMaterial?: boolean;
    raised?: boolean;
    raisedIos?: boolean;
    raisedMaterial?: boolean;
    inline?: boolean;
    segmented?: boolean;
    segmentedStrong?: boolean;
    segmentedActive?: boolean;
    touchRipple?: boolean;
    onclick?: ((() => void) & MouseEventHandler<HTMLButtonElement>) | undefined;
    children: Snippet;
} & HTMLButtonAttributes, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, "">;
type Button = InstanceType<typeof Button>;
export default Button;
