<script lang="ts">
  import { ActionsLabelClasses } from '../../shared/classes/ActionsLabelClasses.js';
  import { ActionsLabelColors } from '../../shared/colors/ActionsLabelColors.js';
  import { useTheme } from '../shared/use-theme.js';
  import { useThemeClasses } from '../shared/use-theme-classes.js';
  import { useDarkClasses } from '../shared/use-dark-classes.js';
  import { Snippet } from 'svelte';

  let {
    class: className,
    colors: colorsProp,
    ios,
    material,
    fontSizeIos = 'text-sm',
    fontSizeMaterial = 'text-sm',
    dividers,
    children,
    ...restProps
  }: {
    class?: string;
    colors?: {
      ios?: string;
      material?: string;
    };
    ios?: boolean;
    material?: boolean;
    fontSizeIos?: string;
    fontSizeMaterial?: string;
    dividers?: boolean;
    children: Snippet;
  } = $props();

  const dark = useDarkClasses();

  let theme = useTheme({}, (v) => (theme = v));

  let attrs = $derived({
    ...restProps,
  });

  let colors = $derived(ActionsLabelColors(colorsProp, dark));

  let isDividers = $derived(
    typeof dividers === 'undefined' ? theme === 'ios' : dividers
  );

  let c = $state(
    useThemeClasses(
      { ios, material },
      ActionsLabelClasses(
        { fontSizeIos, fontSizeMaterial, dividers: isDividers },
        colors
      ),
      (v) => (c = v),
      className
    )
  );
</script>

<div class="{c.base}" {...attrs}>
  {@render children()}
</div>
