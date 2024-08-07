import { type Writable } from 'svelte/store';
declare const KonstaStore: Writable<{
    theme: "ios" | "material";
    dark: boolean;
    touchRipple: boolean;
}>;
export { KonstaStore };
