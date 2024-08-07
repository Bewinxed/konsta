<script lang="ts">
  import type { Snippet } from '../types/svelte.js';

  import { BreadcrumbsSeparatorClasses } from '$konsta/classes/BreadcrumbsSeparatorClasses.js';
  import { useThemeClasses } from '$shared/use-theme-classes.js';

  import ChevronIcon from './icons/ChevronIcon.svelte';

  let {
    class: className,
    ios,
    material,
    children,
    ...restProps
  }: {
    class?: string;
    ios?: any;
    material?: any;
    children?: Snippet;
  } = $props();

  let c = $state(
    useThemeClasses(
      { ios, material },
      BreadcrumbsSeparatorClasses(),
      (v) => (c = v),
      className
    )
  );
</script>

<div class="{c.base}" {...restProps}>
  <ChevronIcon class="{c.icon}" />
  {@render children()}
</div>
