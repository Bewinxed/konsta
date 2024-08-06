<script lang="ts">
  import { Component, Snippet } from 'svelte';

  import { useThemeClasses } from '../shared/use-theme-classes.js';
  import { useTouchRipple } from '../shared/use-touch-ripple.svelte.js';
  import { useDarkClasses } from '../shared/use-dark-classes.js';
  import { FabClasses } from '../../shared/classes/FabClasses.js';
  import { FabColors } from '../../shared/colors/FabColors.js';
  import { printText } from '../shared/print-text.js';

  let {
    class: className,
    colors: colorsProp,
    ios,
    material,
    component: Component = 'a',
    href,
    text,
    textPosition = 'after',
    touchRipple = true,
    textSlot,
    iconSlot,
    onClick,
    children,
    ...restProps
  }: {
    class?: string;
    colors?: string;
    ios?: boolean;
    material?: boolean;
    component?: string | Component;
    href?: string;
    text?: string;
    textPosition?: string;
    touchRipple?: boolean;
    onClick?: () => void;
    textSlot?: Snippet;
    iconSlot?: Snippet;
    children?: Snippet;
  } = $props();

  let rippleEl = $state({ current: null });

  const dark = useDarkClasses();

  $effect(() => useTouchRipple(rippleEl, touchRipple));

  let colors = $derived(FabColors(colorsProp, dark));

  let c = $derived(
    useThemeClasses(
      { ios, material },
      FabClasses({}, colors),
      (v) => (c = v),
      className
    )
  );
</script>

{#if typeof Component === 'string'}
  <svelte:element
    this="{Component}"
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
  <Component
    class="{text ? c.base.withText : c.base.iconOnly}"
    {href}
    bind:this="{rippleEl.current}"
    onclick="{onClick}"
    {...restProps}
  >
    {#if (text || $$slots.text) && textPosition === 'before'}
      <span class="{c.text}">{printText(text)}<slot name="text" /></span>
    {/if}
    {#if $$slots.icon}
      <span class="{c.icon}"><slot name="icon" /></span>
    {/if}
    {#if (text || $$slots.text) && textPosition === 'after'}
      <span class="{c.text}">{printText(text)}<slot name="text" /></span>
    {/if}
    {@render children()}
  </Component>
{/if}
