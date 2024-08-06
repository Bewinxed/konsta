<script lang="ts">
  import { Snippet } from 'svelte';

  import { TableBodyClasses } from '../../shared/classes/TableBodyClasses.js';
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
      TableBodyClasses({}),
      (v) => (c = v),
      className
    )
  );
</script>

<tbody bind:this="{rippleEl.current}" class="{c.base}" {...restProps}>
  {@render children()}
</tbody>
