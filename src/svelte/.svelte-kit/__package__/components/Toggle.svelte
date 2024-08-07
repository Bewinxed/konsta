<script lang="ts">import { ToggleClasses } from "../../../shared/classes/ToggleClasses.js";
import { ToggleColors } from "../../../shared/colors/ToggleColors.js";
import { useDarkClasses } from "../shared/use-dark-classes.js";
import { useThemeClasses } from "../shared/use-theme-classes.js";
import { useTouchRipple } from "../shared/use-touch-ripple.svelte.js";
let {
  component = "label",
  elRef = { current: null },
  rippleTargetElRef = { current: null },
  class: className,
  colors: colorsProp,
  ios,
  material,
  checked = false,
  name,
  value,
  disabled = false,
  readonly = false,
  onChange,
  touchRipple = true,
  children,
  ...restProps
} = $props();
const dark = useDarkClasses();
useTouchRipple(rippleTargetElRef, touchRipple, elRef);
let colors = $derived(ToggleColors(colorsProp, dark));
let _state = $derived(checked ? "checked" : "notChecked");
let c = $state(
  useThemeClasses(
    { ios, material },
    ToggleClasses({}, colors, className, dark),
    (v) => c = v,
    className
  )
);
</script>

<svelte:element
  this="{component}"
  bind:this="{elRef.current}"
  class="{c.base[_state]}"
  {...restProps}
>
  <input
    type="checkbox"
    {name}
    {value}
    {disabled}
    {readonly}
    {checked}
    onchange="{onChange}"
    class="{c.input}"
  />
  <span class="{c.inner[_state]}"></span>
  <span bind:this="{rippleTargetElRef.current}" class="{c.thumbWrap[_state]}">
    <span class="{c.thumb[_state]}"></span>
  </span>
  {@render children()}
</svelte:element>
