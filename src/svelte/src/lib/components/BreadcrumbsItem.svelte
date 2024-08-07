<script lang="ts">
  import type { Snippet } from '../types/svelte.js';

  import { BreadcrumbsItemClasses } from '$konsta/classes/BreadcrumbsItemClasses.js';
  import { BreadcrumbsItemColors } from '$konsta/colors/BreadcrumbsItemColors.js';
  import { useDarkClasses } from '$shared/use-dark-classes.js';
  import { useThemeClasses } from '$shared/use-theme-classes.js';

  let {
    class: className,
    ios,
    material,
    colors: colorsProp,
    onClick,
    active = false,
    children,
    ...restProps
  }: {
    class?: string;
    ios?: any;
    material?: any;
    colors?: any;
    onClick?: any;
    active?: any;
    children?: Snippet;
  } = $props();

  const dark = useDarkClasses();

  let colors = $derived(BreadcrumbsItemColors(colorsProp, dark));

  let c = $state(
    useThemeClasses(
      { ios, material },
      BreadcrumbsItemClasses({ active }, colors),
      (v) => (c = v),
      className
    )
  );
</script>

<div
  class="{c.base}"
  {...restProps}
  role="menuitem"
  tabindex="0"
  onclick="{onClick}"
>
  {@render children()}
</div>
