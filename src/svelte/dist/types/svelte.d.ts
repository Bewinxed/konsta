const SnippetReturn: unique symbol;

// Use an interface instead of a type, makes for better intellisense info because the type is named in more situations.
/**
 * The type of a `#snippet` block. You can use it to (for example) express that your component expects a snippet of a certain type:
 * ```ts
 * let { banner }: { banner: Snippet<[{ text: string }]> } = $props();
 * ```
 * You can only call a snippet through the `{@render ...}` tag.
 *
 * https://svelte-5-preview.vercel.app/docs/snippets
 *
 * @template Parameters the parameters that the snippet expects (if any) as a tuple.
 */
export interface Snippet<Parameters extends unknown[] = []> {
  (
    this: void,
    // this conditional allows tuples but not arrays. Arrays would indicate a
    // rest parameter type, which is not supported. If rest parameters are added
    // in the future, the condition can be removed.
    ...args: number extends Parameters['length'] ? never : Parameters
  ): typeof SnippetReturn & {
    _: 'functions passed to {@render ...} tags must use the `Snippet` type imported from "svelte"';
  };
}

declare const brand: unique symbol;
type Brand<B> = { [brand]: B };
type Branded<T, B> = T & Brand<B>;

/**
 * Internal implementation details that vary between environments
 */
export type ComponentInternals = Branded<{}, 'ComponentInternals'>;

/**
 * Can be used to create strongly typed Svelte components.
 *
 * #### Example:
 *
 * You have component library on npm called `component-library`, from which
 * you export a component called `MyComponent`. For Svelte+TypeScript users,
 * you want to provide typings. Therefore you create a `index.d.ts`:
 * ```ts
 * import type { Component } from 'svelte';
 * export declare const MyComponent: Component<{ foo: string }> {}
 * ```
 * Typing this makes it possible for IDEs like VS Code with the Svelte extension
 * to provide intellisense and to use the component like this in a Svelte file
 * with TypeScript:
 * ```svelte
 * <script lang="ts">
 * 	import { MyComponent } from "component-library";
 * </script>
 * <MyComponent foo={'bar'} />
 * ```
 */
export interface Component<
  Props extends Record<string, any> = {},
  Exports extends Record<string, any> = {},
  Bindings extends keyof Props | '' = string,
> {
  /**
   * @param internal An internal object used by Svelte. Do not use or modify.
   * @param props The props passed to the component.
   */
  (
    this: void,
    internals: ComponentInternals,
    props: Props
  ): {
    /**
     * @deprecated This method only exists when using one of the legacy compatibility helpers, which
     * is a stop-gap solution. See https://svelte-5-preview.vercel.app/docs/breaking-changes#components-are-no-longer-classes
     * for more info.
     */
    $on?(type: string, callback: (e: any) => void): () => void;
    /**
     * @deprecated This method only exists when using one of the legacy compatibility helpers, which
     * is a stop-gap solution. See https://svelte-5-preview.vercel.app/docs/breaking-changes#components-are-no-longer-classes
     * for more info.
     */
    $set?(props: Partial<Props>): void;
  } & Exports;
  /** The custom element version of the component. Only present if compiled with the `customElement` compiler option */
  element?: typeof HTMLElement;
  /** Does not exist at runtime, for typing capabilities only. DO NOT USE */
  z_$$bindings?: Bindings;
}
