<script lang="ts">
  import { Snippet } from 'svelte';

  import { BlockFooterClasses } from '../../shared/classes/BlockFooterClasses.js';
  import { BlockFooterColors } from '../../shared/colors/BlockFooterColors.js';
  import { useTheme } from '../shared/use-theme.js';
  import { useThemeClasses } from '../shared/use-theme-classes.js';
  import { useDarkClasses } from '../shared/use-dark-classes.js';

  let {
    class: className,
    colors: colorsProp,
    ios,
    material,
    inset,
    insetIos = false,
    insetMaterial = false,
    children,
    ...restProps
  }: {
    class?: string;
    colors?: any;
    ios?: any;
    material?: any;
    inset?: any;
    insetIos?: any;
    insetMaterial?: any;
    children?: Snippet;
  } = $props();

  let theme = $state(useTheme({}, (v) => (theme = v)));

  const dark = useDarkClasses();

  let isInset = $derived(
    typeof inset === 'undefined'
      ? theme === 'ios'
        ? insetIos
        : insetMaterial
      : inset
  );

  let colors = $derived(BlockFooterColors(colorsProp, dark));

  let c = $state(
    useThemeClasses(
      { ios, material },
      BlockFooterClasses({ inset: isInset }, colors),
      (v) => (c = v),
      className
    )
  );
</script>

<div class="{c.base}" {...restProps}>
  {@render children()}
</div>
