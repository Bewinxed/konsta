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
declare const Stepper: $$__sveltets_2_IsomorphicComponent<{
    class?: string;
    colors?: string;
    ios?: boolean;
    material?: boolean;
    component?: string;
    value?: number;
    input?: boolean;
    inputType?: string;
    inputPlaceholder?: string;
    inputDisabled?: boolean;
    inputReadonly?: boolean;
    buttonsOnly?: boolean;
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
    outline?: boolean;
    outlineIos?: boolean;
    outlineMaterial?: boolean;
    onInput?: (e: any) => void;
    onChange?: (e: any) => void;
    onFocus?: (e: any) => void;
    onBlur?: (e: any) => void;
    onMinus?: (e: any) => void;
    onPlus?: (e: any) => void;
    touchRipple?: boolean;
    children?: Snippet;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, "">;
type Stepper = InstanceType<typeof Stepper>;
export default Stepper;
