<script lang="ts">
  import { Component, Snippet } from 'svelte';

  import { useThemeClasses } from '../shared/use-theme-classes.js';
  import { useTheme } from '../shared/use-theme.js';

  import { useDarkClasses } from '../shared/use-dark-classes.js';
  import { DialogButtonClasses } from '../../shared/classes/DialogButtonClasses.js';
  import { DialogButtonColors } from '../../shared/colors/DialogButtonColors.js';
  import Button from './Button.svelte';

  let {
    class: className,
    colors: colorsProp,
    ios,
    material,
    component: Component = 'button',
    disabled = false,
    strong,
    strongIos,
    strongMaterial,
    onClick,
    children,
    ...restProps
  }: {
    class?: string;
    colors?: string;
    ios?: boolean;
    material?: boolean;
    component?: string | Component;
    disabled?: boolean;
    strong?: boolean;
    strongIos?: boolean;
    strongMaterial?: boolean;
    onClick?: () => void;
    children?: Snippet;
  } = $props();

  let theme = $derived(useTheme({}, (v) => (theme = v)));

  let isStrong = $derived(
    typeof strong === 'undefined'
      ? theme === 'ios'
        ? strongIos
        : strongMaterial
      : strong
  );

  let attrs = $derived({
    ...restProps,
  });

  const dark = useDarkClasses();

  let colors = $derived(DialogButtonColors(colorsProp, dark));

  let c = $derived(
    useThemeClasses(
      { ios, material },
      DialogButtonClasses({ disabled, strong: isStrong }, colors),
      (v) => (c = v),
      className
    )
  );
</script>

{#if theme === 'ios'}
  {#if typeof Component === 'string'}
    <svelte:element
      this="{Component}"
      class="{c.base}"
      {disabled}
      {...attrs}
      role="button"
      tabindex="0"
      onclick="{onClick}"
    >
      {@render children()}
    </svelte:element>
  {:else}
    <Component
      this="{Component}"
      class="{c.base}"
      {disabled}
      {...attrs}
      onclick="{onClick}"
    >
      {@render children()}
    </Component>
  {/if}
{:else}
  <Button
    component="{Component}"
    inline
    rounded
    {disabled}
    clear="{!isStrong}"
    class="{className}"
    {onClick}
    {...attrs}
  >
    {@render children()}
  </Button>
{/if}
