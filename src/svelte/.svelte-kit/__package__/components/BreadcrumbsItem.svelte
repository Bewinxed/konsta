<script lang="ts">import { BreadcrumbsItemClasses } from "../../../shared/classes/BreadcrumbsItemClasses.js";
import { BreadcrumbsItemColors } from "../../../shared/colors/BreadcrumbsItemColors.js";
import { useDarkClasses } from "../shared/use-dark-classes.js";
import { useThemeClasses } from "../shared/use-theme-classes.js";
let {
  class: className,
  ios,
  material,
  colors: colorsProp,
  onClick,
  active = false,
  children,
  ...restProps
} = $props();
const dark = useDarkClasses();
let colors = $derived(BreadcrumbsItemColors(colorsProp, dark));
let c = $state({});
c = useThemeClasses(
  { ios, material },
  BreadcrumbsItemClasses({ active }, colors),
  (v) => c = v,
  className
);
</script>

<div
  class="{c.base}"
  {...restProps}
  role="menuitem"
  tabindex="0"
  onclick="{onClick}"
>
  {@render children()}
</div>
