<script lang="ts">import { ChipClasses } from "../../../shared/classes/ChipClasses.js";
import { ChipColors } from "../../../shared/colors/ChipColors.js";
import { useDarkClasses } from "../shared/use-dark-classes.js";
import { useThemeClasses } from "../shared/use-theme-classes.js";
import { useTheme } from "../shared/use-theme.js";
import DeleteIcon from "./icons/DeleteIcon.svelte";
let {
  class: className,
  colors: colorsProp,
  ios,
  material,
  deleteButton,
  onDelete,
  outline = false,
  onClick,
  children,
  mediaSlot,
  ...restProps
} = $props();
const dark = useDarkClasses();
let theme = $state("");
theme = useTheme({}, (v) => theme = v);
let style = $derived(outline ? "outline" : "fill");
let colors = $derived(ChipColors(colorsProp, dark));
let c = $state({});
c = useThemeClasses(
  { ios, material },
  ChipClasses({}, colors),
  (v) => c = v
);
</script>

<div class="{c.base[style]}" {...restProps} onclick="{onClick}">
  {#if mediaSlot}
    <div class="{c.media}">{@render mediaSlot()}</div>
  {/if}
  {@render children()}
  {#if deleteButton}
    <div
      class="{c.deleteButton}"
      role="button"
      tabindex="0"
      onclick="{onDelete}"
    >
      <DeleteIcon {theme} class="h-4 w-4" />
    </div>
  {/if}
</div>
