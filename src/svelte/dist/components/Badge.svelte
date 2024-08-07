<script lang="ts">import { BadgeClasses } from "../../../shared/classes/BadgeClasses.js";
import { BadgeColors } from "../../../shared/colors/BadgeColors.js";
import { useThemeClasses } from "../shared/use-theme-classes.js";
let {
  class: className,
  colors: colorsProp,
  ios,
  material,
  small = false,
  onClick,
  children,
  ...restProps
} = $props();
let colors = $derived(BadgeColors(colorsProp));
let size = $derived(small ? "sm" : "md");
let c = $state(
  useThemeClasses(
    { ios, material },
    BadgeClasses({ small }, colors),
    (v) => c = v,
    className
  )
);
</script>

<span class="{c.base[size]}" {...restProps} onclick="{onClick}">
  {@render children()}
</span>
