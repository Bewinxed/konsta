<script lang="ts">
  import { Snippet } from 'svelte';

  import { MessagesClasses } from '../../shared/classes/MessagesClasses.js';
  import { useThemeClasses } from '../shared/use-theme-classes.js';

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

  let c = $derived(
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
