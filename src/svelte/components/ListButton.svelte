<script lang="ts">
  import { Component, Snippet } from 'svelte';

  import { useThemeClasses } from '../shared/use-theme-classes.js';
  import { useDarkClasses } from '../shared/use-dark-classes.js';
  import { useTouchRipple } from '../shared/use-touch-ripple.svelte.js';
  import { ListButtonClasses } from '../../shared/classes/ListButtonClasses.js';
  import { ListButtonColors } from '../../shared/colors/ListButtonColors.js';
  import { useTheme } from '../shared/use-theme.js';
  import { getReactiveContext } from '../shared/get-reactive-context.js';

  let {
    class: className,
    colors: colorsProp,
    ios,
    material,
    href,
    target,
    type,
    value,
    linkProps = {},
    touchRipple = true,
    linkComponent = 'a',
    children,
    ...restProps
  }: {
    class?: string;
    colors?: string;
    ios?: boolean;
    material?: boolean;
    href?: string;
    target?: string;
    type?: string;
    value?: any;
    linkProps?: any;
    touchRipple?: boolean;
    linkComponent?: string | Component;
    children?: Snippet;
  } = $props();

  // Link props

  // Button props

  let ListDividersContext = $state<{ value?: boolean }>(
    getReactiveContext('ListDividersContext', (value) => {
      ListDividersContext = value || {};
    }) || { value: false }
  );

  let rippleEl = $state({ current: null });

  let theme = $derived(useTheme({ ios, material }, (v) => (theme = v)));

  $effect(() => useTouchRipple(rippleEl, touchRipple));

  const dark = useDarkClasses();

  let colors = $derived(ListButtonColors(colorsProp, dark));

  let c = $derived(
    useThemeClasses(
      { ios, material },
      ListButtonClasses(
        { dividers: ListDividersContext.value },
        colors,
        className
      ),
      (v) => (c = v),
      className
    )
  );

  let isLink = $derived(!!href || href === '');
  let hrefComputed = $derived(
    !isLink || href === true || href === false ? undefined : href || ''
  );
  let buttonAttrs = $derived({
    href: hrefComputed,
    target,
    type,
    value,
    ...linkProps,
  });

  const ButtonComponent = isLink ? linkComponent : 'button';
</script>

<li class="{c.base}" {...restProps}>
  {#if typeof ButtonComponent === 'string'}
    <!-- svelte-ignore a11y-missing-attribute -->
    <svelte:element
      this="{ButtonComponent}"
      bind:this="{rippleEl.current}"
      class="{c.button}"
      {...buttonAttrs}
    >
      {@render children()}
    </svelte:element>
  {:else}
    <ButtonComponent
      this="{ButtonComponent}"
      bind:this="{rippleEl.current}"
      class="{c.button}"
      {...buttonAttrs}
    >
      {@render children()}
    </ButtonComponent>
  {/if}
</li>
