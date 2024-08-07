<script lang="ts">
  import type { Snippet } from '../types/svelte.js';

  import { TableHeadClasses } from '$konsta/classes/TableHeadClasses.js';
  import { useThemeClasses } from '$shared/use-theme-classes.js';

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
      TableHeadClasses(),
      (v) => (c = v),
      className
    )
  );
</script>

<thead bind:this="{rippleEl.current}" class="{c.base}" {...restProps}>
  {@render children()}
</thead>
