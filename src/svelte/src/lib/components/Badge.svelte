<script lang="ts">
  import type { Snippet } from '../types/svelte.js';

  import { BadgeClasses } from '$konsta/classes/BadgeClasses.js';
  import { BadgeColors } from '$konsta/colors/BadgeColors.js';
  import { useThemeClasses } from '$shared/use-theme-classes.js';

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

  let c = $state({});
  c = useThemeClasses(
    { ios, material },
    BadgeClasses({ small }, colors),
    (v) => (c = v),
    className
  );
</script>

<span class="{c.base[size]}" {...restProps} onclick="{onClick}">
  {@render children()}
</span>
