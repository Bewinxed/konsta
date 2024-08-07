<script lang="ts">import { onDestroy, onMount } from "svelte";
import { cls } from "../../../shared/cls.js";
import { useThemeClasses } from "../shared/use-theme-classes.js";
import { useTheme } from "../shared/use-theme.js";
import { calcPopoverPosition } from "../../../shared/calc-popover-position.js";
import { useDarkClasses } from "../shared/use-dark-classes.js";
import { PopoverClasses } from "../../../shared/classes/PopoverClasses.js";
import { PopoverColors } from "../../../shared/colors/PopoverColors.js";
let {
  class: className,
  colors: colorsProp,
  ios,
  material,
  style = "",
  angle = true,
  angleClass = "",
  size = "w-64",
  opened = false,
  backdrop = true,
  onBackdropClick,
  target,
  targetX,
  targetY,
  targetWidth,
  targetHeight,
  translucent = true,
  children,
  ...restProps
} = $props();
let el = $state();
let angleEl = $state();
let positions = $state({
  set: false,
  angleTop: 0,
  angleLeft: 0,
  anglePosition: "bottom",
  popoverTop: 0,
  popoverLeft: 0,
  popoverPosition: "top-left"
});
let _state = $derived(opened ? "opened" : "closed");
let theme = $state(useTheme({ ios, material }, (v) => theme = v));
const dark = useDarkClasses();
let colors = $derived(PopoverColors(colorsProp, dark));
let c = $state(
  useThemeClasses(
    { ios, material },
    PopoverClasses({ size, angleClass, translucent }, colors, className),
    (v) => c = v,
    className
  )
);
const setPopover = () => {
  if (!target || !el || !opened) return;
  positions = calcPopoverPosition({
    popoverEl: el,
    targetEl: target,
    angleEl,
    needsAngle: angle,
    targetX,
    targetY,
    targetWidth,
    targetHeight,
    theme
  });
};
const attachEvents = () => {
  if (typeof window === "undefined") return;
  window.addEventListener("resize", setPopover);
};
const detachEvents = () => {
  if (typeof window === "undefined") return;
  window.removeEventListener("resize", setPopover);
};
onMount(() => {
  attachEvents();
});
onDestroy(() => {
  detachEvents();
});
function watchOpened(openedPassed) {
  setPopover();
}
$effect(() => watchOpened(opened));
let popoverStyle = $derived(
  positions.set ? `
        ${style || ""};
        left: ${positions.popoverLeft};
        top: ${positions.popoverTop};
      ` : style || ""
);
let angleStyle = $derived(
  positions.set ? `
        left: ${positions.angleLeft};
        top: ${positions.angleTop};
      ` : void 0
);
const originClasses = {
  "top-right": "origin-bottom-left",
  "top-left": "origin-bottom-right",
  "middle-left": "origin-right",
  "middle-right": "origin-left",
  "bottom-right": "origin-top-left",
  "bottom-left": "origin-top-right"
};
let classes = $derived(
  cls(
    c.base[_state],
    theme === "material" && originClasses[positions.popoverPosition]
  )
);
</script>

{#if backdrop}
  <div class="{c.backdrop[_state]}" onclick="{onBackdropClick}"></div>
{/if}
<div bind:this="{el}" class="{classes}" style="{popoverStyle}" {...restProps}>
  {#if angle}
    <div
      bind:this="{angleEl}"
      style="{angleStyle}"
      class="{c.angleWrap[positions.anglePosition]}"
    >
      <div class="{c.angleArrow[positions.anglePosition]}"></div>
    </div>
  {/if}
  <div class="{c.inner}">
    {@render children()}
  </div>
</div>
