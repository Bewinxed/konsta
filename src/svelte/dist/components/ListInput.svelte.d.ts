import type { Component } from '../types/svelte.js';
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
declare const ListInput: $$__sveltets_2_IsomorphicComponent<{
    class?: string;
    colors?: string;
    ios?: boolean;
    material?: boolean;
    component?: string | Component;
    label?: string;
    outline?: boolean;
    outlineIos?: boolean;
    outlineMaterial?: boolean;
    floatingLabel?: boolean;
    info?: string;
    error?: string | boolean;
    clearButton?: boolean;
    dropdown?: boolean;
    inputId?: string;
    inputStyle?: string;
    inputClass?: string;
    name?: string;
    value?: any;
    type?: string;
    inputmode?: string;
    readonly?: boolean;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
    size?: string;
    accept?: string;
    autocomplete?: string;
    autocorrect?: string;
    autocapitalize?: string;
    spellcheck?: any;
    autofocus?: boolean;
    autosave?: string;
    max?: string;
    min?: string;
    step?: string;
    maxlength?: string;
    minlength?: string;
    multiple?: boolean;
    pattern?: string;
    tabindex?: number;
    labelSlot?: Snippet;
    mediaSlot?: Snippet;
    innerSlot?: Snippet;
    inputSlot?: Snippet;
    errorSlot?: Snippet;
    infoSlot?: Snippet;
    contentSlot?: Snippet;
    onInput?: (e: any) => void;
    onChange?: (e: any) => void;
    onFocus?: (e: any) => void;
    onBlur?: (e: any) => void;
    onClear?: (e: any) => void;
    children?: Snippet;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, "">;
type ListInput = InstanceType<typeof ListInput>;
export default ListInput;
