<script lang="ts">import { useThemeClasses } from "../shared/use-theme-classes.js";
import { useTouchRipple } from "../shared/use-touch-ripple.svelte.js";
import { useDarkClasses } from "../shared/use-dark-classes.js";
import { FabClasses } from "../../../shared/classes/FabClasses.js";
import { FabColors } from "../../../shared/colors/FabColors.js";
import { printText } from "../shared/print-text.js";
let {
  class: className,
  colors: colorsProp,
  ios,
  material,
  component: ElComponent = "a",
  href,
  text,
  textPosition = "after",
  touchRipple = true,
  textSlot,
  iconSlot,
  onClick,
  children,
  ...restProps
} = $props();
let rippleEl = $state({ current: null });
const dark = useDarkClasses();
$effect(() => useTouchRipple(rippleEl, touchRipple));
let colors = $derived(FabColors(colorsProp, dark));
let c = $state(
  useThemeClasses(
    { ios, material },
    FabClasses({}, colors),
    (v) => c = v,
    className
  )
);
</script>

{#if typeof ElComponent === 'string'}
  <svelte:element
    this="{ElComponent}"
    class="{text ? c.base.withText : c.base.iconOnly}"
    {href}
    bind:this="{rippleEl.current}"
    role="button"
    tabindex="0"
    onclick="{onClick}"
    {...restProps}
  >
    {#if (text || textSlot) && textPosition === 'before'}
      <span class="{c.text}"
        >{printText(text)}
        {@render textSlot()}
      </span>
    {/if}
    {#if iconSlot}
      <span class="{c.icon}">
        {@render iconSlot()}
      </span>
    {/if}
    {#if (text || textSlot) && textPosition === 'after'}
      <span class="{c.text}"
        >{printText(text)}
        {@render textSlot()}
      </span>
    {/if}
    {@render children()}
  </svelte:element>
{:else}
  <ElComponent
    class="{text ? c.base.withText : c.base.iconOnly}"
    {href}
    bind:this="{rippleEl.current}"
    onclick="{onClick}"
    {...restProps}
  >
    {#if (text || textSlot) && textPosition === 'before'}
      <span class="{c.text}">{printText(text)}{@render textSlot()}</span>
    {/if}
    {#if iconSlot}
      <span class="{c.icon}">{@render iconSlot()}</span>
    {/if}
    {#if (text || textSlot) && textPosition === 'after'}
      <span class="{c.text}">{printText(text)}{@render textSlot()}</span>
    {/if}
    {@render children()}
  </ElComponent>
{/if}
