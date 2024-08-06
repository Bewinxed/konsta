<script lang="ts">
  import { Snippet } from 'svelte';

  import { ToastClasses } from '../../shared/classes/ToastClasses.js';
  import { ToastColors } from '../../shared/colors/ToastColors.js';
  import { useThemeClasses } from '../shared/use-theme-classes.js';
  import { useDarkClasses } from '../shared/use-dark-classes.js';

  let {
    class: className,
    colors: colorsProp,
    ios,
    material,
    translucent = true,
    position = 'left',
    opened = false,
    children,
    buttonSlot,
    ...restProps
  }: {
    class?: string;
    colors?: string;
    ios?: boolean;
    material?: boolean;
    translucent?: boolean;
    position?: string;
    opened?: boolean;
      buttonSlot?: Snippet;
    children?: Snippet;
  } = $props();

  const dark = useDarkClasses();

  let colors = $derived(ToastColors(colorsProp, dark));

  let c = $state(
    useThemeClasses(
      { ios, material },
      ToastClasses({ opened, translucent }, colors, className),
      (v) => (c = v),
      className
    )
  );
</script>

<div class="{c.base[position]}" {...restProps}>
  <div class="{c.content}">
    {@render children()}
    {#if buttonSlot}
      <div class="{c.button}">{@render buttonSlot()}</div>
    {/if}
  </div>
</div>
