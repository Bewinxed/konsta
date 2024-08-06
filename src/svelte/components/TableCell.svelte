<script lang="ts">
  import { Snippet } from 'svelte';

  import { TableCellClasses } from '../../shared/classes/TableCellClasses.js';
  import { TableCellColors } from '../../shared/colors/TableCellColors.js';
  import { useDarkClasses } from '../shared/use-dark-classes.js';
  import { useThemeClasses } from '../shared/use-theme-classes.js';

  let {
    header = false,
    class: className,
    colors: colorsProp,
    ios,
    material,
    children,
    ...restProps
  }: {
    header?: boolean;
    class?: string;
    colors?: string;
    ios?: boolean;
    material?: boolean;
    children?: Snippet;
  } = $props();

  const component = header ? 'th' : 'td';
  let rippleEl = $state({ current: null });
  const dark = useDarkClasses();
  let colors = $derived(TableCellColors(colorsProp, dark));

  let c = $derived(
    useThemeClasses(
      { ios, material },
      TableCellClasses({ header }, colors),
      (v) => (c = v),
      className
    )
  );
</script>

<svelte:element
  this="{component}"
  bind:this="{rippleEl.current}"
  class="{c.base}"
  {...restProps}
>
  {@render children()}
</svelte:element>
