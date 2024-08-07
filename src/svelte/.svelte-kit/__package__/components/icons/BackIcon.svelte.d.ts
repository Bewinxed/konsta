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
declare const BackIcon: $$__sveltets_2_IsomorphicComponent<{
    theme?: string;
    onclick?: (e?: any) => void;
    children?: any;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, "">;
type BackIcon = InstanceType<typeof BackIcon>;
export default BackIcon;
