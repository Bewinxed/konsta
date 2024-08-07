<script lang="ts">import { PopupClasses } from "../../../shared/classes/PopupClasses.js";
import { PopupColors } from "../../../shared/colors/PopupColors.js";
import { useDarkClasses } from "../shared/use-dark-classes.js";
import { useThemeClasses } from "../shared/use-theme-classes.js";
let {
  class: className,
  colors: colorsProp,
  ios,
  material,
  size = "w-screen h-screen md:w-160 md:h-160",
  opened = false,
  backdrop = true,
  onBackdropClick,
  children,
  ...restProps
} = $props();
let _state = $derived(opened ? "opened" : "closed");
const dark = useDarkClasses();
let colors = $derived(PopupColors(colorsProp, dark));
let c = $state(
  useThemeClasses(
    { ios, material },
    PopupClasses({ size }, colors, className),
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
