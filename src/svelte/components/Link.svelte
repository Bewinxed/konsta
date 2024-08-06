<script lang="ts">
  import { Snippet } from 'svelte';

  import { cls } from '../../shared/cls.js';
  import { useTheme } from '../shared/use-theme.js';
  import { useThemeClasses } from '../shared/use-theme-classes.js';
  import { useTouchRipple } from '../shared/use-touch-ripple.svelte.js';
  import { useDarkClasses } from '../shared/use-dark-classes.js';
  import { LinkClasses } from '../../shared/classes/LinkClasses.js';
  import { LinkColors } from '../../shared/colors/LinkColors.js';

  let {
    class: className,
    colors: colorsProp,
    ios,
    material,
    component = 'a',
    linkProps = {},
    navbar = false,
    toolbar = false,
    iconOnly = false,
    tabbar = false,
    tabbarActive = false,
    touchRipple = false,
    onClick,
    children,
    ...restProps
  }: {
    class?: string;
    colors?: string;
    ios?: boolean;
    material?: boolean;
    component?: string;
    linkProps?: any;
    navbar?: boolean;
    toolbar?: boolean;
    iconOnly?: boolean;
    tabbar?: boolean;
    tabbarActive?: boolean;
    touchRipple?: boolean;
    onClick?: () => void;
    children?: Snippet;
  } = $props();

  // Toolbar/navbar link

  let rippleEl = $state({ current: null });

  let theme = $derived(useTheme({ ios, material }, (v) => (theme = v)));

  const dark = useDarkClasses();

  let needsTouchRipple = $derived(
    theme === 'material' &&
      (touchRipple ||
        (typeof touchRipple === 'undefined' && (toolbar || tabbar || navbar)))
  );

  $effect(() => useTouchRipple(rippleEl, needsTouchRipple));

  let colors = $derived(LinkColors(colorsProp, dark));

  let themeTextColor = $derived(
    navbar
      ? theme === 'material'
        ? colors.navbarTextMaterial
        : colors.navbarTextIos
      : theme === 'material'
        ? colors.textMaterial
        : colors.textIos
  );

  let textColor = $derived(
    tabbar && !tabbarActive ? colors.tabbarInactive : themeTextColor
  );

  let tabbarState = $derived(tabbarActive ? 'active' : 'inactive');

  let c = $derived(
    useThemeClasses(
      { ios, material },
      LinkClasses({ iconOnly }, { textColor, needsTouchRipple }, className),

      (v) => (c = v),
      ''
    )
  );

  let classes = $derived(
    cls(
      // base
      c.value.base[tabbar ? 'default' : 'notTabbar'],
      toolbar && c.value.toolbar,
      navbar && c.value.navbar,
      tabbar && c.value.tabbar[tabbarState],
      className
    )
  );
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<svelte:element
  this="{component}"
  bind:this="{rippleEl.current}"
  class="{classes}"
  {...restProps}
  {...linkProps}
  role="link"
  tabindex="0"
  onclick="{onClick}"
>
  {@render children()}
</svelte:element>
