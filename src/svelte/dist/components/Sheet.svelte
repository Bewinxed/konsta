<script lang="ts">import { SheetClasses } from "../../../shared/classes/SheetClasses.js";
import { SheetColors } from "../../../shared/colors/SheetColors.js";
import { useDarkClasses } from "../shared/use-dark-classes.js";
import { useThemeClasses } from "../shared/use-theme-classes.js";
let {
  class: className,
  colors: colorsProp,
  ios,
  material,
  opened = false,
  backdrop = true,
  onBackdropClick,
  children,
  ...restProps
} = $props();
let _state = $derived(opened ? "opened" : "closed");
const dark = useDarkClasses();
let colors = $derived(SheetColors(colorsProp, dark));
let c = $state(
  useThemeClasses(
    { ios, material },
    SheetClasses({}, colors, className),
    (v) => c = v,
    className
  )
);
</script>

{#if backdrop}
  <div class="{c.backdrop[_state]}" onclick="{onBackdropClick}"></div>
{/if}
<div class="{c.base[_state]}" {...restProps}>
  {@render children()}
</div>
