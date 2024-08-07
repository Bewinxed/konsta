<script lang="ts">
  import type { Snippet } from '../types/svelte.js';

  import { MessagesTitleClasses } from '$konsta/classes/MessagesTitleClasses.js';
  import { MessagesTitleColors } from '$konsta/colors/MessagesTitleColors.js';
  import { useThemeClasses } from '$shared/use-theme-classes.js';
  import { useDarkClasses } from '$shared/use-dark-classes.js';

  let {
    class: className,
    colors: colorsProp,
    ios,
    material,
    component = 'div',
    id,
    children,
    ...restProps
  }: {
    class?: string;
    colors?: any;
    ios?: any;
    material?: any;
    component?: any;
    id?: any;
    children?: Snippet;
  } = $props();

  let rippleEl = $state({ current: null });

  const dark = useDarkClasses();

  let colors = $derived(MessagesTitleColors(colorsProp, dark));

  let c = $state(
    useThemeClasses(
      { ios, material },
      MessagesTitleClasses({}, colors),
      (v) => (c = v),
      className
    )
  );
</script>

<svelte:element
  this="{component}"
  {id}
  bind:this="{rippleEl.current}"
  class="{c.base}"
  {...restProps}
>
  {@render children()}
</svelte:element>
