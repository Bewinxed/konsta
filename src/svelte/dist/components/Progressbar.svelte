<script lang="ts">import { ProgressbarClasses } from "../../../shared/classes/ProgressbarClasses.js";
import { ProgressbarColors } from "../../../shared/colors/ProgressbarColors.js";
import { useThemeClasses } from "../shared/use-theme-classes.js";
import { useDarkClasses } from "../shared/use-dark-classes.js";
let {
  class: className,
  colors: colorsProp,
  ios,
  material,
  progress = 0,
  children,
  ...restProps
} = $props();
const dark = useDarkClasses();
let colors = $derived(ProgressbarColors(colorsProp, dark));
let c = $state(
  useThemeClasses(
    { ios, material },
    ProgressbarClasses(colors),
    (v) => c = v,
    className
  )
);
</script>

<span class="{c.base}" {...restProps}>
  <span
    class="{c.inner}"
    style="{`transform: translateX(-${100 - (progress / 1) * 100}%)`}"
  ></span>
  {@render children()}
</span>
