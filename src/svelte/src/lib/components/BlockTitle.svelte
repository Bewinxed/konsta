<script lang="ts">
  import type { Snippet } from '../types/svelte.js';

  import { BlockTitleClasses } from '$konsta/classes/BlockTitleClasses.js';
  import { BlockTitleColors } from '$konsta/colors/BlockTitleColors.js';
  import { useThemeClasses } from '$shared/use-theme-classes.js';
  import { useDarkClasses } from '$shared/use-dark-classes.js';

  let {
    class: className,
    colors: colorsProp,
    ios,
    material,
    withBlock = true,
    medium = false,
    large = false,
    children,
    ...restProps
  }: {
    class?: string;
    colors?: any;
    ios?: any;
    material?: any;
    withBlock?: any;
    medium?: any;
    large?: any;
    children?: Snippet;
  } = $props();

  const dark = useDarkClasses();

  let colors = $derived(BlockTitleColors(colorsProp, dark));

  let c = $state(
    useThemeClasses(
      { ios, material },
      BlockTitleClasses({ withBlock, medium, large }, colors),
      (v) => (c = v),
      className
    )
  );
</script>

<div class="{c.base}" {...restProps}>
  {@render children()}
</div>
