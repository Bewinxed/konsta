<script lang="ts">import { TableRowClasses } from "../../../shared/classes/TableRowClasses.js";
import { TableRowColors } from "../../../shared/colors/TableRowColors.js";
import { useDarkClasses } from "../shared/use-dark-classes.js";
import { useThemeClasses } from "../shared/use-theme-classes.js";
let {
  class: className,
  colors: colorsProp,
  ios,
  material,
  header,
  children,
  ...restProps
} = $props();
let rippleEl = $state({ current: null });
const dark = useDarkClasses();
let colors = $derived(TableRowColors(colorsProp, dark));
let c = $state(
  useThemeClasses(
    { ios, material },
    TableRowClasses({ header }, colors),
    (v) => c = v,
    className
  )
);
</script>

<tr bind:this="{rippleEl.current}" class="{c.base}" {...restProps}>
  {@render children()}
</tr>
