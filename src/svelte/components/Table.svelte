<script lang="ts">
  import { Snippet } from 'svelte';

  import { TableClasses } from '../../shared/classes/TableClasses.js';
  import { useThemeClasses } from '../shared/use-theme-classes.js';

  let {
    class: className,
    ios,
    material,
    children,
    ...restProps
  }: {
    class?: string;
    ios?: boolean;
    material?: boolean;
    children?: Snippet;
  } = $props();

  let rippleEl = $state({ current: null });

  let c = $state(
    useThemeClasses(
      { ios, material },
      TableClasses(),
      (v) => (c = v),
      className
    )
  );
</script>

<table bind:this="{rippleEl.current}" class="{c.base}" {...restProps}>
  {@render children()}
</table>
