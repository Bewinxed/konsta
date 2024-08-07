<script lang="ts">import { MessagesTitleClasses } from "../../../shared/classes/MessagesTitleClasses.js";
import { MessagesTitleColors } from "../../../shared/colors/MessagesTitleColors.js";
import { useThemeClasses } from "../shared/use-theme-classes.js";
import { useDarkClasses } from "../shared/use-dark-classes.js";
let {
  class: className,
  colors: colorsProp,
  ios,
  material,
  component = "div",
  id,
  children,
  ...restProps
} = $props();
let rippleEl = $state({ current: null });
const dark = useDarkClasses();
let colors = $derived(MessagesTitleColors(colorsProp, dark));
let c = $state({});
c = useThemeClasses(
  { ios, material },
  MessagesTitleClasses({}, colors),
  (v) => c = v,
  className
);
</script>

<svelte:element
  this="{component}"
  {id}
  bind:this="{rippleEl.current}"
  class="{c.base}"
  {...restProps}
>
  {@render children()}
</svelte:element>
