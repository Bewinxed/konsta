<script lang="ts">
  import type { Snippet } from '../types/svelte.js';

  import { cls } from '$konsta/cls.js';
  import { PanelClasses } from '$konsta/classes/PanelClasses.js';
  import { PanelColors } from '$konsta/colors/PanelColors.js';
  import { useDarkClasses } from '$shared/use-dark-classes.js';
  import { useThemeClasses } from '$shared/use-theme-classes.js';

  let {
    class: className,
    colors: colorsProp,
    ios,
    material,
    size = 'w-72 h-screen',
    side = 'left',
    opened = false,
    backdrop = true,
    floating = false,
    onBackdropClick,
    children,
    ...restProps
  }: {
    class?: string;
    colors?: string;
    ios?: boolean;
    material?: boolean;
    size?: string;
    side?: string;
    opened?: boolean;
    backdrop?: boolean;
    floating?: boolean;
    onBackdropClick?: () => void;
    children: Snippet;
  } = $props();

  let _state = $derived(opened ? 'opened' : 'closed');

  const dark = useDarkClasses();

  let colors = $derived(PanelColors(colorsProp, dark));

  let c = $state({});
  c = useThemeClasses(
    { ios, material },
    PanelClasses({ size, floating }, colors, className),
    (v) => (c = v),
    className
  );

  let classes = $derived(cls(c.base, c[side][_state]));
</script>

{#if backdrop}
  <div class="{c.backdrop[_state]}" onclick="{onBackdropClick}"></div>
{/if}
<div class="{classes}" {...restProps}>
  {@render children()}
</div>
