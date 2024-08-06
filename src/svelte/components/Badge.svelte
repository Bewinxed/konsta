<script lang="ts">
  import { Snippet } from 'svelte';
  import { BadgeClasses } from '../../shared/classes/BadgeClasses.js';
  import { BadgeColors } from '../../shared/colors/BadgeColors.js';
  import { useThemeClasses } from '../shared/use-theme-classes.js';

  let {
    class: className,
    colors: colorsProp,
    ios,
    material,
    small = false,
    onClick,
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
    small?: boolean;
    onClick?: () => void;
    children?: Snippet;
  } = $props();

  let colors = $derived(BadgeColors(colorsProp));

  let size = $derived(small ? 'sm' : 'md');

  let c = $derived(
    useThemeClasses(
      { ios, material },
      BadgeClasses({ small }, colors),
      (v) => (c = v),
      className
    )
  );
</script>

<span class="{c.base[size]}" {...restProps} onclick="{onClick}">
  {@render children()}
</span>
