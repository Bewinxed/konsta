<script lang="ts">
  import { type Component } from 'svelte';
  import type { Snippet } from '../types/svelte.js';

  import { cls } from '$konsta/cls.js';
  import { useTouchRipple } from '$shared/use-touch-ripple.svelte.js';
  import { useThemeClasses } from '$shared/use-theme-classes.js';
  import { useTheme } from '$shared/use-theme.js';

  import { useDarkClasses } from '$shared/use-dark-classes.js';
  import { ButtonClasses } from '$konsta/classes/ButtonClasses.js';
  import { ButtonColors } from '$konsta/colors/ButtonColors.js';
  import type {
    HTMLButtonAttributes,
    MouseEventHandler,
  } from 'svelte/elements';

  let {
    class: className,
    colors: colorsProp,
    ios,
    material,
    component: ElComponent = 'button',
    href,
    disabled = false,
    outline,
    outlineIos,
    outlineMaterial,
    clear,
    clearIos,
    clearMaterial,
    tonal,
    tonalIos,
    tonalMaterial,
    rounded,
    roundedIos,
    roundedMaterial,
    small,
    smallIos,
    smallMaterial,
    large,
    largeIos,
    largeMaterial,
    raised,
    raisedIos,
    raisedMaterial,
    inline = false,
    segmented = false,
    segmentedStrong = false,
    segmentedActive = false,
    touchRipple = true,
    onclick: OnClick,
    onclick,
    children,
    ...restProps
  }: {
    class?: string;
    colors?: string;
    ios?: boolean;
    material?: boolean;
    component?: string | Component;
    href?: string;
    disabled?: boolean;
    outline?: boolean;
    outlineIos?: boolean;
    outlineMaterial?: boolean;
    clear?: boolean;
    clearIos?: boolean;
    clearMaterial?: boolean;
    tonal?: boolean;
    tonalIos?: boolean;
    tonalMaterial?: boolean;
    rounded?: boolean;
    roundedIos?: boolean;
    roundedMaterial?: boolean;
    small?: boolean;
    smallIos?: boolean;
    smallMaterial?: boolean;
    large?: boolean;
    largeIos?: boolean;
    largeMaterial?: boolean;
    raised?: boolean;
    raisedIos?: boolean;
    raisedMaterial?: boolean;
    inline?: boolean;
    segmented?: boolean;
    segmentedStrong?: boolean;
    segmentedActive?: boolean;
    touchRipple?: boolean;
    onclick?: ((() => void) & MouseEventHandler<HTMLButtonElement>) | undefined;
    children: Snippet;
  } & HTMLButtonAttributes = $props();

  // Anchor props

  // Style props

  // Segmented

  let theme = $state('');

  theme = useTheme({}, (v) => (theme = v));

  let rippleEl = $state({ current: null });

  let attrs = $derived({
    href,
    ...restProps,
  });

  const dark = useDarkClasses();

  $effect(() => useTouchRipple(rippleEl, touchRipple));

  let isOutline = $derived(
    typeof outline === 'undefined'
      ? theme === 'ios'
        ? outlineIos
        : outlineMaterial
      : outline
  );
  let isClear = $derived(
    typeof clear === 'undefined'
      ? theme === 'ios'
        ? clearIos
        : clearMaterial
      : clear
  );
  let isTonal = $derived(
    typeof tonal === 'undefined'
      ? theme === 'ios'
        ? tonalIos
        : tonalMaterial
      : tonal
  );
  let isRounded = $derived(
    typeof rounded === 'undefined'
      ? theme === 'ios'
        ? roundedIos
        : roundedMaterial
      : rounded
  );
  let isSmall = $derived(
    typeof small === 'undefined'
      ? theme === 'ios'
        ? smallIos
        : smallMaterial
      : small
  );
  let isLarge = $derived(
    typeof large === 'undefined'
      ? theme === 'ios'
        ? largeIos
        : largeMaterial
      : large
  );
  let isRaised = $derived(
    typeof raised === 'undefined'
      ? theme === 'ios'
        ? raisedIos
        : raisedMaterial
      : raised
  );

  let size = $derived(isLarge ? 'large' : isSmall ? 'small' : 'medium');

  const getStyle = (
    isOutline: boolean,
    isClear: boolean,
    isTonal: boolean,
    segmented: boolean,
    segmentedActive: boolean,
    segmentedStrong: boolean
  ) => {
    let s = isOutline
      ? 'outline'
      : isClear || (segmented && !segmentedActive)
        ? 'clear'
        : isTonal
          ? 'tonal'
          : 'fill';
    if (segmentedStrong) s = 'segmentedStrong';
    if (segmentedStrong && segmentedActive) s = 'segmentedStrongActive';
    return s;
  };

  let style = $derived(
    getStyle(
      isOutline,
      isClear,
      isTonal,
      segmented,
      segmentedActive,
      segmentedStrong
    )
  );

  let colors = $derived(ButtonColors(colorsProp, dark));

  let c = $state({});
  c = useThemeClasses(
    { ios, material },
    ButtonClasses(
      {
        inline,
        segmented,
        segmentedStrong,
        segmentedActive,
        disabled,
        outline: isOutline,
        clear: isClear,
        tonal: isTonal,
        rounded: isRounded,
        small: isSmall,
        large: isLarge,
        raised: isRaised,
      },
      colors,
      className,
      dark
    ),
    (v) => (c = v),
    ''
  );

  let classes = $derived(
    cls(
      c.base[isRounded ? 'rounded' : 'square'],

      // style
      c.style[style],

      // size
      c.size[size],

      isRaised && c.raised,

      className
    )
  );
</script>

{#if typeof ElComponent === 'string'}
  <svelte:element
    this="{ElComponent}"
    bind:this="{rippleEl.current}"
    class="{classes}"
    {disabled}
    {...attrs}
    role="button"
    tabindex="0"
    {onclick}
  >
    {@render children()}
  </svelte:element>
{:else}
  <ElComponent
    this="{ElComponent}"
    bind:this="{rippleEl.current}"
    class="{classes}"
    {disabled}
    {...attrs}
    {onclick}
  >
    {@render children()}
  </ElComponent>
{/if}
