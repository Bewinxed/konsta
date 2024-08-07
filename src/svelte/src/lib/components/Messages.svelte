<script lang="ts">
  import type { Snippet } from '../types/svelte.js';

  import { MessagesClasses } from '$konsta/classes/MessagesClasses.js';
  import { useThemeClasses } from '$shared/use-theme-classes.js';

  let {
    class: className,
    ios,
    material,
    component = 'div',
    id,
    children,
    ...restProps
  }: {
    class?: string;
    ios?: boolean;
    material?: boolean;
    component?: string;
    id?: string;
    children?: Snippet;
  } = $props();

  let rippleEl = $state({ current: null });

  let c = $state(
    useThemeClasses(
      { ios, material },
      MessagesClasses(),

      (v) => (c = v),
      className
    )
  );
</script>

<svelte:element
  this="{component}"
  {id}
  bind:this="{rippleEl.current}"
  class="{c.base}"
  {...restProps}
>
  {@render children()}
</svelte:element>
