<script lang="ts">
  import { Snippet, type Component } from 'svelte';

  import { CardClasses } from '../../shared/classes/CardClasses.js';
  import { CardColors } from '../../shared/colors/CardColors.js';
  import { useDarkClasses } from '../shared/use-dark-classes.js';
  import { useTheme } from '../shared/use-theme.js';
  import { useThemeClasses } from '../shared/use-theme-classes.js';
  import { printText } from '../shared/print-text.js';

  let {
    component: Component = 'div',
    class: className,
    colors: colorsProp,
    ios,
    material,
    margin = 'm-4',
    header = '',
    footer = '',
    contentWrap = true,
    contentWrapPadding = 'p-4',
    raised,
    raisedIos,
    raisedMaterial,
    outline,
    outlineIos,
    outlineMaterial,
    headerDivider = false,
    footerDivider = false,
    children,
    ...restProps
  }: {
    component?: string | Component;
    class?: string;
    colors?: any;
    ios?: any;
    material?: any;
    margin?: string;
    header?: string;
    footer?: string;
    contentWrap?: boolean;
    contentWrapPadding?: string;
    raised?: boolean;
    raisedIos?: boolean;
    raisedMaterial?: boolean;
    outline?: boolean;
    outlineIos?: boolean;
    outlineMaterial?: boolean;
    headerDivider?: boolean;
    footerDivider?: boolean;
    children?: Snippet;
  } = $props();

  const dark = useDarkClasses();

  let theme;
  theme = useTheme({}, (v) => (theme = v));

  let isOutline = $derived(
    typeof outline === 'undefined'
      ? theme === 'ios'
        ? outlineIos
        : outlineMaterial
      : outline
  );

  let isRaised = $derived(
    typeof raised === 'undefined'
      ? theme === 'ios'
        ? raisedIos
        : raisedMaterial
      : raised
  );

  let style = $derived(isOutline ? 'outline' : isRaised ? 'raised' : 'plain');

  let colors = $derived(CardColors(colorsProp, dark));

  let c = $derived(
    useThemeClasses(
      { ios, material },
      CardClasses(
        {
          margin,
          contentWrapPadding,
          headerDivider,
          footerDivider,
        },
        colors
      ),
      (v) => (c = v),
      ''
    )
  );
</script>

{#if typeof Component === 'string'}
  <svelte:element this="{Component}" class="{c.base[style]}" {...restProps}>
    {#if header || $$slots.header}
      <div class="{c.header}">{printText(header)}<slot name="header" /></div>
    {/if}
    {#if contentWrap}
      <div class="{c.content}">{@render children()}</div>
    {:else}
      {@render children()}
    {/if}
    {#if footer || $$slots.footer}
      <div class="{c.footer}">{printText(footer)}<slot name="footer" /></div>
    {/if}
  </svelte:element>
{:else}
  <Component this="{Component}" class="{c.base[style]}" {...restProps}>
    {#if header || $$slots.header}
      <div class="{c.header}">{printText(header)}<slot name="header" /></div>
    {/if}
    {#if contentWrap}
      <div class="{c.content}">{@render children()}</div>
    {:else}
      {@render children()}
    {/if}
    {#if footer || $$slots.footer}
      <div class="{c.footer}">{printText(footer)}<slot name="footer" /></div>
    {/if}
  </Component>
{/if}
