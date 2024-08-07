<script lang="ts">
  import type { Snippet } from '../types/svelte.js';

  import { CheckboxClasses } from '$konsta/classes/CheckboxClasses.js';
  import { CheckboxColors } from '$konsta/colors/CheckboxColors.js';
  import { useDarkClasses } from '$shared/use-dark-classes.js';
  import { useThemeClasses } from '$shared/use-theme-classes.js';
  import { useTouchRipple } from '$shared/use-touch-ripple.svelte.js';

  import CheckboxIcon from './icons/CheckboxIcon.svelte';

  let {
    class: className,
    colors: colorsProp,
    ios,
    material,
    component = 'label',
    checked = false,
    indeterminate = false,
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
    colors?: any;
    ios?: any;
    material?: any;
    component?: string;
    checked?: boolean;
    indeterminate?: boolean;
    name?: string;
    value?: any;
    disabled?: boolean;
    readonly?: boolean;
    onChange?: () => void;
    touchRipple?: boolean;
    children?: Snippet;
  } = $props();

  let inputEl = $state<HTMLInputElement>();
  let rippleEl = $state({ current: null });

  const dark = useDarkClasses();

  $effect(() => useTouchRipple(rippleEl, touchRipple));

  let colors = $derived(CheckboxColors(colorsProp, dark));

  let _state = $derived(checked || indeterminate ? 'checked' : 'notChecked');

  let c = $state(
    useThemeClasses(
      { ios, material },
      CheckboxClasses({}, colors, className, dark),
      (v) => (c = v),
      className
    )
  );

  function watchIndeterminate(indeterminatePassed) {
    if (inputEl) {
      inputEl.indeterminate = !!indeterminate;
    }
  }

  $effect(() => {
    watchIndeterminate(indeterminate);
  });
</script>

<svelte:element
  this="{component}"
  bind:this="{rippleEl.current}"
  class="{c.base}"
  {...restProps}
>
  <input
    bind:this="{inputEl}"
    type="checkbox"
    {name}
    {value}
    {disabled}
    {readonly}
    {checked}
    onchange="{onChange}"
    class="{c.input}"
  />
  <i class="{c.iconWrap[_state]}">
    {#if indeterminate}
      <span class="{c.indeterminateIcon}"></span>
    {:else}
      <CheckboxIcon {ios} {material} class="{c.icon[_state]}" />
    {/if}
  </i>
  {@render children()}
</svelte:element>
