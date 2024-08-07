<script lang="ts">import { cls } from "../../../shared/cls.js";
import { PanelClasses } from "../../../shared/classes/PanelClasses.js";
import { PanelColors } from "../../../shared/colors/PanelColors.js";
import { useDarkClasses } from "../shared/use-dark-classes.js";
import { useThemeClasses } from "../shared/use-theme-classes.js";
let {
  class: className,
  colors: colorsProp,
  ios,
  material,
  size = "w-72 h-screen",
  side = "left",
  opened = false,
  backdrop = true,
  floating = false,
  onBackdropClick,
  children,
  ...restProps
} = $props();
let _state = $derived(opened ? "opened" : "closed");
const dark = useDarkClasses();
let colors = $derived(PanelColors(colorsProp, dark));
let c = $state(
  useThemeClasses(
    { ios, material },
    PanelClasses({ size, floating }, colors, className),
    (v) => c = v,
    className
  )
);
let classes = $derived(cls(c.base, c[side][_state]));
</script>

{#if backdrop}
  <div class="{c.backdrop[_state]}" onclick="{onBackdropClick}"></div>
{/if}
<div class="{classes}" {...restProps}>
  {@render children()}
</div>
