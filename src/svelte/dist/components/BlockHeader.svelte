<script lang="ts">import { BlockHeaderClasses } from "../../../shared/classes/BlockHeaderClasses.js";
import { BlockHeaderColors } from "../../../shared/colors/BlockHeaderColors.js";
import { useTheme } from "../shared/use-theme.js";
import { useThemeClasses } from "../shared/use-theme-classes.js";
import { useDarkClasses } from "../shared/use-dark-classes.js";
let {
  class: className,
  colors: colorsProp,
  ios,
  material,
  inset,
  insetIos = false,
  insetMaterial = false,
  children,
  ...restProps
} = $props();
let theme = $state("");
theme = useTheme({}, (v) => theme = v);
const dark = useDarkClasses();
let isInset = $derived(
  typeof inset === "undefined" ? theme === "ios" ? insetIos : insetMaterial : inset
);
let colors = $derived(BlockHeaderColors(colorsProp, dark));
let c = $state({});
c = useThemeClasses(
  { ios, material },
  BlockHeaderClasses({ inset: isInset }, colors),
  (v) => c = v,
  className
);
</script>

<div class="{c.base}" {...restProps}>
  {@render children()}
</div>
