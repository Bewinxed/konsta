<script lang="ts">
  import { Snippet } from 'svelte';

  import { onMount } from 'svelte';
  import { useTheme } from '../shared/use-theme.js';
  import { useThemeClasses } from '../shared/use-theme-classes.js';
  import DeleteIcon from './icons/DeleteIcon.svelte';
  import SearchIcon from './icons/SearchIcon.svelte';
  import BackIcon from './icons/BackIcon.svelte';
  import { useDarkClasses } from '../shared/use-dark-classes.js';
  import { SearchbarClasses } from '../../shared/classes/SearchbarClasses.js';
  import { SearchbarColors } from '../../shared/colors/SearchbarColors.js';
  import { cls } from '../../shared/cls.js';
  import { useTouchRipple } from '../shared/use-touch-ripple.svelte.js';

  let {
    class: className,
    colors: colorsProp,
    ios,
    material,
    component = 'div',
    placeholder = 'Search',
    value,
    inputId,
    inputStyle,
    disableButton = false,
    disableButtonText = 'Cancel',
    clearButton = true,
    onInput,
    onChange,
    onFocus,
    onBlur,
    onClear,
    onDisable,
    touchRipple = true,
    children,
    ...restProps
  }: {
    class?: string;
    colors?: string;
    ios?: boolean;
    material?: boolean;
    component?: string;
    placeholder?: string;
    value?: any;
    inputId?: string;
    inputStyle?: any;
    disableButton?: boolean;
    disableButtonText?: string;
    clearButton?: boolean;
    onInput?: (e?: any) => void;
    onChange?: (e?: any) => void;
    onFocus?: (e?: any) => void;
    onBlur?: (e?: any) => void;
    onClear?: (e?: any) => void;
    onDisable?: (e?: any) => void;
    touchRipple?: boolean;
    children?: Snippet;
  } = $props();

  let theme = $state(useTheme({ ios, material }, (v) => (theme = v)));

  let searchEl = $state<HTMLElement>();
  let rippleEl = $state({ current: null });

  $effect(() => useTouchRipple(rippleEl, touchRipple));

  let isEnabled = $state(false);
  let disableButtonRef = $state<HTMLElement>();
  let disableButtonWidth = $state(0);
  let disableTimeout = $state<ReturnType<typeof setTimeout>>();
  let allowTransition = $state(false);

  const dark = useDarkClasses();

  let colors = $derived(SearchbarColors(colorsProp, dark));

  const handleInput = (e) => {
    if (onInput) onInput(e);
  };

  const handleChange = (e) => {
    if (onChange) onChange(e);
  };

  const handleFocus = (e) => {
    isEnabled = true;
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    if (onBlur) onBlur(e);
  };

  const onGlobalBlur = () => {
    if (!value) {
      disableTimeout = setTimeout(() => {
        isEnabled = false;
      });
    }
  };

  const onGlobalFocus = () => {
    clearTimeout(disableTimeout);
  };

  const handleDisableButton = (e) => {
    e.preventDefault();
    isEnabled = false;
    if (searchEl) {
      searchEl.blur();
    }
    if (onDisable) onDisable();
    if (onClear) onClear();
  };

  onMount(() => {
    if (disableButtonRef) {
      disableButtonWidth = disableButtonRef.offsetWidth;
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        allowTransition = true;
      });
    });
  });

  let c = $state(
    useThemeClasses(
      { ios, material },
      SearchbarClasses({}, colors, {
        isEnabled,
        darkClasses: dark,
      }),
      (v) => (c = v),
      className
    )
  );
</script>

<svelte:element
  this="{component}"
  bind:this="{rippleEl.current}"
  class="{c.base}"
  onblurCapture="{onGlobalBlur}"
  onfocusCapture="{onGlobalFocus}"
  {...restProps}
>
  <div class="{c.inner}">
    <span class="{c.searchIconWrap}">
      <SearchIcon {theme} class="{c.searchIcon}" />
    </span>
    <input
      id="{inputId}"
      bind:this="{searchEl}"
      class="{cls(c.input)}"
      style="{inputStyle}"
      type="text"
      name="search"
      {placeholder}
      {value}
      oninput="{handleInput}"
      onchange="{handleChange}"
      onfocus="{handleFocus}"
      onblur="{handleBlur}"
    />
    {#if value && clearButton}
      <button class="{c.clearButton}" onclick="{onClear}" type="button">
        <DeleteIcon {theme} class="{c.deleteIcon}" />
      </button>
    {/if}
  </div>
  {#if disableButton}
    {#if theme === 'ios'}
      <button
        type="button"
        bind:this="{disableButtonRef}"
        style="margin-right: {isEnabled
          ? 0
          : `-${disableButtonWidth}px`}; transition-duration: {!allowTransition
          ? '0ms'
          : ''};"
        class="{c.cancelButton}"
        onclick="{handleDisableButton}"
        onpointerdown="{(e) => e.preventDefault()}"
      >
        {disableButtonText}
      </button>
    {:else}
      <button
        type="button"
        onclick="{handleDisableButton}"
        onpointerdown="{(e) => e.preventDefault()}"
        class="{cls(c.cancelButton)}"
      >
        <BackIcon {theme} onclick="{handleDisableButton}" />
      </button>
    {/if}
  {/if}
</svelte:element>
