<script lang="ts">
  import { ActionsButtonClasses } from '$konsta/classes/ActionsButtonClasses.js';
  import { ActionsButtonColors } from '$konsta/colors/ActionsButtonColors.js';
  import { useThemeClasses } from '$shared/use-theme-classes.js';
  import { useTheme } from '$shared/use-theme.js';
  import { useDarkClasses } from '$shared/use-dark-classes.js';
  import { useTouchRipple } from '$shared/use-touch-ripple.svelte.js';
  import type { Snippet } from '../types/svelte.js';

  let {
    class: className,
    colors: colorsProp,
    ios,
    material,
    component = 'button',
    href,
    bold,
    boldIos,
    boldMaterial,
    fontSizeIos,
    fontSizeMaterial,
    touchRipple,
    dividers,
    onClick,
    children,
    ...restProps
  }: {
    class?: string;
    colors?: {
      ios?: string;
      material?: string;
    };
    component?: string;
    ios?: boolean;
    material?: boolean;
    href?: string;
    target?: string;
    bold?: boolean;
    boldIos?: boolean;
    boldMaterial?: boolean;
    fontSizeIos?: string;
    fontSizeMaterial?: string;
    touchRipple?: boolean;
    dividers?: boolean;
    children?: Snippet;
    onClick?: () => void;
  } = $props();

  let rippleEl = $state({ current: null });

  const dark = useDarkClasses();

  $effect(() => useTouchRipple(rippleEl, touchRipple));

  let attrs = $derived({
    href,
    ...restProps,
  });

  let Component = $derived(
    typeof component === 'undefined' && (href || href === '') ? 'a' : 'button'
  );

  let colors = $derived(ActionsButtonColors(colorsProp, dark));

  let theme = useTheme({}, (v) => (theme = v));

  let isDividers = $derived(
    typeof dividers === 'undefined' ? theme === 'ios' : dividers
  );

  let isBold = $derived(
    typeof bold === 'undefined'
      ? theme === 'ios'
        ? boldIos
        : boldMaterial
      : bold
  );

  let c = $state(
    useThemeClasses(
      { ios, material },
      ActionsButtonClasses(
        { bold: isBold, fontSizeIos, fontSizeMaterial, dividers: isDividers },
        colors,
        dark
      ),
      (v) => (c = v),
      className
    )
  );
</script>

<svelte:element
  this="{Component}"
  bind:this="{rippleEl.current}"
  class="{c.base}"
  role="button"
  tabindex="0"
  onclick="{onClick}"
  {...attrs}
>
  {@render children()}
</svelte:element>
