<script lang="ts">
  import type { Snippet } from '../types/svelte.js';

  import { TableRowClasses } from '$konsta/classes/TableRowClasses.js';
  import { TableRowColors } from '$konsta/colors/TableRowColors.js';
  import { useDarkClasses } from '$shared/use-dark-classes.js';
  import { useThemeClasses } from '$shared/use-theme-classes.js';

  let {
    class: className,
    colors: colorsProp,
    ios,
    material,
    header,
    children,
    ...restProps
  }: {
    class?: string;
    colors?: any;
    ios?: any;
    material?: any;
    header?: any;
    children: Snippet;
  } = $props();

  let rippleEl = $state({ current: null });
  const dark = useDarkClasses();
  let colors = $derived(TableRowColors(colorsProp, dark));

  let c = $state({});
  c = useThemeClasses(
    { ios, material },
    TableRowClasses({ header }, colors),
    (v) => (c = v),
    className
  );
</script>

<tr bind:this="{rippleEl.current}" class="{c.base}" {...restProps}>
  {@render children()}
</tr>
