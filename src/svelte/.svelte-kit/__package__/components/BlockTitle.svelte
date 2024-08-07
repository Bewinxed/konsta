<script lang="ts">import { BlockTitleClasses } from "../../../shared/classes/BlockTitleClasses.js";
import { BlockTitleColors } from "../../../shared/colors/BlockTitleColors.js";
import { useThemeClasses } from "../shared/use-theme-classes.js";
import { useDarkClasses } from "../shared/use-dark-classes.js";
let {
  class: className,
  colors: colorsProp,
  ios,
  material,
  withBlock = true,
  medium = false,
  large = false,
  children,
  ...restProps
} = $props();
const dark = useDarkClasses();
let colors = $derived(BlockTitleColors(colorsProp, dark));
let c = $state({});
c = useThemeClasses(
  { ios, material },
  BlockTitleClasses({ withBlock, medium, large }, colors),
  (v) => c = v,
  className
);
</script>

<div class="{c.base}" {...restProps}>
  {@render children()}
</div>
