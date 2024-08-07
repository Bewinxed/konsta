<script lang="ts">
  import type { Snippet } from '../types/svelte.js';

  import { useTheme } from '$shared/use-theme.js';
  import { useThemeClasses } from '$shared/use-theme-classes.js';
  import { useTouchRipple } from '$shared/use-touch-ripple.svelte.js';
  import CheckboxIcon from './icons/CheckboxIcon.svelte';
  import { useDarkClasses } from '$shared/use-dark-classes.js';
  import { RadioClasses } from '$konsta/classes/RadioClasses.js';
  import { RadioColors } from '$konsta/colors/RadioColors.js';

  let {
    class: className,
    colors: colorsProp,
    ios,
    material,
    component = 'label',
    checked = false,
    name,
    value,
    disabled = false,
    readonly = false,
    onChange,
    touchRipple = true,
    children,
    ...restProps
  }: {
    class?: string;
    colors?: string;
    ios?: boolean;
    material?: boolean;
    component?: string;
    checked?: boolean;
    name?: string;
    value?: any;
    disabled?: boolean;
    readonly?: boolean;
    onChange?: (e: any) => void;
    touchRipple?: boolean;
    children?: Snippet;
  } = $props();

  let rippleEl = $state({ current: null });

  let theme = $state('');
  theme = useTheme({ ios, material }, (v) => (theme = v));

  const dark = useDarkClasses();

  $effect(() => useTouchRipple(rippleEl, touchRipple));

  let colors = $derived(RadioColors(colorsProp, dark));

  let _state = $derived(checked ? 'checked' : 'notChecked');

  let c = $state({});
  c = useThemeClasses(
    { ios, material },
    RadioClasses({}, colors, className, dark),
    (v) => (c = v),
    className
  );
</script>

<svelte:element
  this="{component}"
  bind:this="{rippleEl.current}"
  class="{c.base}"
  {...restProps}
>
  <input
    type="radio"
    {name}
    {value}
    {disabled}
    {readonly}
    {checked}
    onchange="{onChange}"
    class="{c.input}"
  />

  <i class="{c.iconWrap[_state]}">
    {#if theme === 'ios'}
      <CheckboxIcon class="{c.icon[_state]}" />
    {:else}
      <span class="{c.icon[_state]}"></span>
    {/if}
  </i>
  {@render children()}
</svelte:element>
