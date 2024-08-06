<script lang="ts">
  import { Snippet } from 'svelte';

  import { TableHeadClasses } from '../../shared/classes/TableHeadClasses.js';
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

  let c = $derived(
    useThemeClasses(
      { ios, material },
      TableHeadClasses(),
      (v) => (c = v),
      className
    )
  );
</script>

<thead bind:this="{rippleEl.current}" class="{c.base}" {...restProps}>
  {@render children()}
</thead>
