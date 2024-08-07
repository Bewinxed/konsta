<script lang="ts">import { MessagebarClasses } from "../../../shared/classes/MessagebarClasses.js";
import { MessagebarColors } from "../../../shared/colors/MessagebarColors.js";
import { useThemeClasses } from "../shared/use-theme-classes.js";
import { useDarkClasses } from "../shared/use-dark-classes.js";
import Toolbar from "./Toolbar.svelte";
let {
  class: className,
  colors: colorsProp,
  ios,
  material,
  component = "div",
  id,
  name,
  placeholder = "Message",
  value,
  outline = false,
  leftClass = "",
  rightClass = "",
  style,
  textareaId,
  disabled,
  size,
  onInput,
  onChange,
  onFocus,
  children,
  ...restProps
} = $props();
let rippleEl = $state({ current: null });
let areaEl = null;
let isFocused = false;
const dark = useDarkClasses();
let colors = $derived(MessagebarColors(colorsProp, dark));
const onFocusInternal = (e) => {
  isFocused = true;
  if (onFocus) onFocus(e);
};
let c = $state({});
c = useThemeClasses(
  { ios, material },
  MessagebarClasses(
    {
      leftClass,
      rightClass
    },
    colors,
    { isFocused }
  ),
  className,
  (v) => c = v
);
</script>

<svelte:element
  this="{component}"
  {id}
  {style}
  bind:this="{rippleEl.current}"
  class="{c.base}"
  {...restProps}
>
  <Toolbar {colors} {outline}>
    {#if $$slots.left}
      <div class="{c.left}"><slot name="left" /></div>
    {/if}
    <div class="{c.messagebarArea}">
      <textarea
        id="{textareaId}"
        bind:this="{areaEl}"
        type="textarea"
        class="{c.messagebarInput}"
        {placeholder}
        {name}
        {value}
        {size}
        {disabled}
        oninput="{onInput}"
        onchange="{onChange}"
        onfocus="{onFocusInternal}"
      ></textarea>
    </div>
    {#if $$slots.right}
      <div class="{c.right}"><slot name="right" /></div>
    {/if}
  </Toolbar>
</svelte:element>
