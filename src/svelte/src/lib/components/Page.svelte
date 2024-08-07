<script lang="ts">
  import type { Snippet } from '../types/svelte.js';

  import { PageClasses } from '$konsta/classes/PageClasses.js';
  import { PageColors } from '$konsta/colors/PageColors.js';
  import { useDarkClasses } from '$shared/use-dark-classes.js';
  import { useThemeClasses } from '$shared/use-theme-classes.js';

  let {
    class: className,
    colors: colorsProp,
    ios,
    material,
    component = 'div',
    children,
    ...restProps
  }: {
    class?: string;
    colors?: string;
    ios?: boolean;
    material?: boolean;
    component?: string;
    children?: Snippet;
  } = $props();

  const dark = useDarkClasses();

  let colors = $derived(PageColors(colorsProp, dark));

  let c = $state({});
  c = useThemeClasses(
    { ios, material },
    PageClasses({}, colors, className),
    (v) => (c = v),
    className
  );
</script>

<svelte:element this="{component}" class="{c.base}" {...restProps}>
  {@render children()}
</svelte:element>
