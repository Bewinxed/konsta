<script lang="ts">import { BreadcrumbsCollapsedClasses } from "../../../shared/classes/BreadcrumbsCollapsedClasses.js";
import { BreadcrumbsCollapsedColors } from "../../../shared/colors/BreadcrumbsCollapsedColors.js";
import { useDarkClasses } from "../shared/use-dark-classes.js";
import { useThemeClasses } from "../shared/use-theme-classes.js";
let {
  class: className,
  ios,
  material,
  colors: colorsProp,
  onClick,
  children,
  ...restProps
} = $props();
const dark = useDarkClasses();
let colors = $derived(BreadcrumbsCollapsedColors(colorsProp, dark));
let c = $state({});
c = useThemeClasses(
  { ios, material },
  BreadcrumbsCollapsedClasses({}, colors),
  (v) => c = v,
  className
);
</script>

<div
  class="{c.base}"
  {...restProps}
  role="button"
  tabindex="0"
  onclick="{onClick}"
>
  <span class="{c.dot}"></span>
  <span class="{c.dot}"></span>
  <span class="{c.dot}"></span>
  {@render children()}
</div>
