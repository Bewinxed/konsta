<script lang="ts">import { DialogClasses } from "../../../shared/classes/DialogClasses.js";
import { DialogColors } from "../../../shared/colors/DialogColors.js";
import { useDarkClasses } from "../shared/use-dark-classes.js";
import { useThemeClasses } from "../shared/use-theme-classes.js";
let {
  class: className,
  colors: colorsProp,
  ios,
  material,
  translucent = true,
  sizeIos = "w-[16.875rem]",
  sizeMaterial = "w-[19.5rem]",
  titleFontSizeIos = "text-[18px]",
  titleFontSizeMaterial = "text-[24px]",
  opened = false,
  backdrop = true,
  onBackdropClick,
  title,
  buttons,
  children,
  ...restProps
} = $props();
let _state = $derived(opened ? "opened" : "closed");
const dark = useDarkClasses();
let colors = $derived(DialogColors(colorsProp, dark));
let c = $state({});
c = useThemeClasses(
  { ios, material },
  DialogClasses(
    {
      translucent,
      sizeIos,
      sizeMaterial,
      titleFontSizeIos,
      titleFontSizeMaterial
    },
    colors,
    className,
    { hasButtons: buttons }
  ),
  (v) => c = v,
  className
);
</script>

{#if backdrop}
  <div class="{c.backdrop[_state]}" onclick="{onBackdropClick}"></div>
{/if}

<div class="{c.base[_state]}" {...restProps}>
  <div class="{c.contentWrap}">
    {#if title}
      <div class="{c.title}">
        {@render title()}
      </div>
    {/if}
    {#if children}
      <div class="{c.content}">
        {@render children()}
      </div>
    {/if}
  </div>
  {#if buttons}
    <div class="{c.buttons}">
      {@render buttons()}
    </div>
  {/if}
</div>
