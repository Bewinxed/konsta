<script lang="ts">
  import { Snippet } from 'svelte';

  import { cls } from '../../shared/cls.js';
  import { useThemeClasses } from '../shared/use-theme-classes.js';
  import { useTheme } from '../shared/use-theme.js';
  import { useDarkClasses } from '../shared/use-dark-classes.js';
  import { useTouchRipple } from '../shared/use-touch-ripple.svelte.js';
  import { StepperClasses } from '../../shared/classes/StepperClasses.js';
  import { StepperColors } from '../../shared/colors/StepperColors.js';

  let {
    class: className,
    colors: colorsProp,
    ios,
    material,
    component = 'span',
    value = 0,
    input = false,
    inputType = 'text',
    inputPlaceholder,
    inputDisabled = false,
    inputReadonly = false,
    buttonsOnly = false,
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
    outline,
    outlineIos,
    outlineMaterial,
    onInput,
    onChange,
    onFocus,
    onBlur,
    onMinus,
    onPlus,
    touchRipple = true,
    children,
    ...restProps
  }: {
    class?: string;
    colors?: string;
    ios?: boolean;
    material?: boolean;
    component?: string;
    value?: number;
    input?: boolean;
    inputType?: string;
    inputPlaceholder?: string;
    inputDisabled?: boolean;
    inputReadonly?: boolean;
    buttonsOnly?: boolean;
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
    outline?: boolean;
    outlineIos?: boolean;
    outlineMaterial?: boolean;
    onInput?: (e: any) => void;
    onChange?: (e: any) => void;
    onFocus?: (e: any) => void;
    onBlur?: (e: any) => void;
    onMinus?: (e: any) => void;
    onPlus?: (e: any) => void;
    touchRipple?: boolean;
    children?: Snippet;
  } = $props();

  let theme = $state(useTheme({ ios, material }, (v) => (theme = v)));

  let isRounded = $derived(rounded || roundedIos || roundedMaterial);
  let isSmall = $derived(small || smallIos || smallMaterial);
  let isLarge = $derived(large || largeIos || largeMaterial);
  let isRaised = $derived(raised || raisedIos || raisedMaterial);
  let isOutline = $derived(outline || outlineIos || outlineMaterial);

  const buttonLeftEl = $state({ current: null });
  const buttonRightEl = $state({ current: null });

  useTouchRipple(buttonLeftEl, touchRipple);
  useTouchRipple(buttonRightEl, touchRipple);

  const dark = useDarkClasses();

  let colors = $derived(StepperColors(colorsProp, dark));

  let size = $derived(isLarge ? 'large' : isSmall ? 'small' : 'medium');
  let style = $derived(
    isOutline && isRaised ? 'clear' : isOutline ? 'outline' : 'fill'
  );
  let shape = $derived(isRounded ? 'rounded' : 'square');

  let c = $state(
    useThemeClasses(
      { ios, material },
      StepperClasses({ buttonsOnly }, colors),
      '',
      (v) => (c = v)
    )
  );

  let classes = $derived(
    cls(c.base, isRaised && c.raised, c.size[size], c.shape[shape], className)
  );
  let buttonLeftClasses = $derived(
    cls(c.button, c.buttonStyle[style], c.buttonLeftShape[shape])
  );
  let buttonRightClasses = $derived(
    cls(c.button, c.buttonStyle[style], c.buttonRightShape[shape])
  );

  let valueClasses = $derived(cls(input && c.input, c.value[style]));
</script>

<svelte:element this="{component}" class="{classes}" {...restProps}>
  <span
    bind:this="{buttonLeftEl.current}"
    class="{buttonLeftClasses}"
    role="button"
    tabindex="0"
    onclick="{onMinus}"
  >
    <span class="{c.hBar}"></span>
  </span>
  {#if input && !buttonsOnly}
    <input
      class="{valueClasses}"
      placeholder="{inputPlaceholder}"
      type="{inputType}"
      {value}
      disabled="{inputDisabled}"
      readonly="{inputReadonly}"
      oninput="{onInput}"
      onchange="{onChange}"
      onfocus="{onFocus}"
      onblur="{onBlur}"
    />
  {/if}
  {#if !input && !buttonsOnly}
    <span class="{valueClasses}">{value}</span>
  {/if}

  <span
    bind:this="{buttonRightEl.current}"
    class="{buttonRightClasses}"
    role="button"
    tabindex="0"
    onclick="{onPlus}"
  >
    <span class="{c.hBar}"></span>
    <span class="{c.vBar}"></span>
  </span>
</svelte:element>
