<script lang="ts">
  import { Component, Snippet } from 'svelte';

  import { useTheme } from '../shared/use-theme.js';
  import { useThemeClasses } from '../shared/use-theme-classes.js';
  import DeleteIcon from './icons/DeleteIcon.svelte';
  import DropdownIcon from './icons/DropdownIcon.svelte';
  import ListItem from './ListItem.svelte';
  import { useDarkClasses } from '../shared/use-dark-classes.js';
  import { ListInputClasses } from '../../shared/classes/ListInputClasses.js';
  import { ListInputColors } from '../../shared/colors/ListInputColors.js';
  import { cls } from '../../shared/cls.js';
  import { printText } from '../shared/print-text.js';
  import { Booleanish } from 'svelte/elements.js';

  let {
    class: className,
    colors: colorsProp,
    ios,
    material,
    component = 'li',
    label = '',
    outline,
    outlineIos,
    outlineMaterial,
    floatingLabel = false,
    info,
    error,
    clearButton = false,
    dropdown = false,
    inputId,
    inputStyle,
    inputClass = '',
    name,
    value,
    type = 'text',
    inputmode,
    readonly,
    required,
    disabled,
    placeholder,
    size,
    accept,
    autocomplete,
    autocorrect,
    autocapitalize,
    spellcheck,
    autofocus,
    autosave,
    max,
    min,
    step,
    maxlength,
    minlength,
    multiple,
    pattern,
    tabindex,
    onInput,
    onChange,
    onFocus,
    onBlur,
    onClear,
    children,
    labelSlot,
    mediaSlot,
    innerSlot,
    inputSlot,
    errorSlot,
    infoSlot,
    contentSlot,
    ...restProps
  }: {
    class?: string;
    colors?: string;
    ios?: boolean;
    material?: boolean;
    component?: string | Component;
    label?: string;
    outline?: boolean;
    outlineIos?: boolean;
    outlineMaterial?: boolean;
    floatingLabel?: boolean;
    info?: string;
    error?: string | boolean;
    clearButton?: boolean;
    dropdown?: boolean;
    inputId?: string;
    inputStyle?: string;
    inputClass?: string;
    name?: string;
    value?: any;
    type?: string;
    inputmode?: string;
    readonly?: boolean;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
    size?: string;
    accept?: string;
    autocomplete?: string;
    autocorrect?: string;
    autocapitalize?: string;
    spellcheck?: Booleanish;
    autofocus?: boolean;
    autosave?: string;
    max?: string;
    min?: string;
    step?: string;
    maxlength?: string;
    minlength?: string;
    multiple?: boolean;
    pattern?: string;
    tabindex?: number;
    labelSlot?: Snippet;
    mediaSlot?: Snippet;
    innerSlot?: Snippet;
    inputSlot?: Snippet;
    errorSlot?: Snippet;
    infoSlot?: Snippet;
    contentSlot?: Snippet;
    onInput?: (e: any) => void;
    onChange?: (e: any) => void;
    onFocus?: (e: any) => void;
    onBlur?: (e: any) => void;
    onClear?: (e: any) => void;
    children?: Snippet;
  } = $props();

  // input props

  let theme = $derived(useTheme({ ios, material }, (v) => (theme = v)));
  theme = useTheme({ ios, material }, (v) => (theme = v));

  $: isOutline =
    typeof outline === 'undefined'
      ? theme === 'ios'
        ? outlineIos
        : outlineMaterial
      : outline;

  let inputEl = $state(null);

  let isFocused = $state(false);

  const dark = useDarkClasses();

  let colors = $derived(ListInputColors(colorsProp, dark));

  let labelStyle = $derived(label && floatingLabel ? 'floating' : 'stacked');

  let labelStyleIsFloating = $derived(
    labelStyle === 'floating' ? 'floating' : 'notFloating'
  );

  const getDomValue = () => {
    if (!inputEl) return undefined;
    return inputEl.value;
  };

  const isInputHasValue = () => {
    const domValue = getDomValue();
    return typeof value === 'undefined'
      ? domValue || domValue === 0
      : value || value === 0;
  };

  let isFloatingTransformed = $derived(
    (label || labelSlot) && floatingLabel && !isInputHasValue() && !isFocused
  );

  const getLabelColor = () => {
    if (error || errorSlot) return colors.errorText;
    if (theme === 'material') {
      return isFocused
        ? colors.labelTextFocusMaterial
        : colors.labelTextMaterial;
    }
    if (theme === 'ios') {
      return isFocused ? colors.labelTextFocusIos : colors.labelTextIos;
    }

    return '';
  };

  const onFocusInternal = (e) => {
    isFocused = true;
    if (onFocus) onFocus(e);
  };
  const onBlurInternal = (e) => {
    isFocused = false;
    if (onBlur) onBlur(e);
  };

  let c = $derived(
    useThemeClasses(
      { ios, material },
      ListInputClasses(
        {
          error,
          type,
          inputClass,
          outline: isOutline,
        },
        colors,
        {
          isFloatingTransformed,
          isFocused,
          darkClasses: dark,
          getLabelColor,
          inputClass,
          hasLabel: label || labelSlot,
        }
      ),
      (v) => (c = v),
      className
    )
  );

  let InputComponent = $derived(
    type === 'select' || type === 'textarea' ? type : 'input'
  );

  let needsType = $derived(InputComponent === 'input');
</script>

<ListItem
  {component}
  class="{c.base}"
  title="{undefined}"
  mediaClass="{c.media}"
  innerClass="{c.inner[labelStyle]}"
  contentClass="{c.itemContent}"
  titleWrapClass="{c.titleWrap}"
  withMedia="{!!mediaSlot}"
  withTitle="{!!labelSlot || !!label}"
  dividers="{theme === 'material' || isOutline ? false : undefined}"
  {...restProps}
>
  {#if isOutline || theme === 'material'}
    <span class="{c.border}"></span>
  {/if}

  {#if mediaSlot}
    {@render children()}
  {/if}

  {#if label || labelSlot}
    <div class="{c.label[labelStyle]}">
      <div class="{c.labelText}">
        {printText(label)}
        {@render labelSlot()}
      </div>
    </div>
  {/if}
  <div class="{c.inputWrap[labelStyle]}">
    {#if inputSlot}
      {@render inputSlot()}
    {:else}
      <!-- svelte-ignore a11y-autofocus -->
      {#if type === 'select'}
        <svelte:element
          this="{InputComponent}"
          id="{inputId}"
          bind:this="{inputEl}"
          class="{c.input[labelStyleIsFloating]}"
          style="{inputStyle}"
          {name}
          type="{needsType ? type : undefined}"
          {placeholder}
          {inputmode}
          {size}
          {accept}
          {autocomplete}
          {autocorrect}
          {autocapitalize}
          {spellcheck}
          {autofocus}
          {autosave}
          {disabled}
          {max}
          {maxlength}
          {min}
          {minlength}
          {step}
          {multiple}
          {readonly}
          {required}
          {pattern}
          {tabindex}
          {value}
          oninput="{onInput}"
          onchange="{onChange}"
          onfocus="{onFocusInternal}"
          onblur="{onBlurInternal}"
        >
          {@render children()}
        </svelte:element>
      {:else}
        <svelte:element
          this="{InputComponent}"
          id="{inputId}"
          bind:this="{inputEl}"
          class="{c.input[labelStyleIsFloating]}"
          style="{inputStyle}"
          {name}
          type="{needsType ? type : undefined}"
          {placeholder}
          {inputmode}
          {size}
          {accept}
          {autocomplete}
          {autocorrect}
          {autocapitalize}
          {spellcheck}
          {autofocus}
          {autosave}
          {disabled}
          {max}
          {maxlength}
          {min}
          {minlength}
          {step}
          {multiple}
          {readonly}
          {required}
          {pattern}
          {tabindex}
          {value}
          oninput="{onInput}"
          onchange="{onChange}"
          onfocus="{onFocusInternal}"
          onblur="{onBlurInternal}"
        ></svelte:element>
      {/if}
    {/if}

    {#if clearButton}
      <DeleteIcon {theme} onClick="{onClear}" class="{c.clearButton}" />
    {/if}
    {#if dropdown}
      <DropdownIcon class="{c.dropdown}" />
    {/if}
  </div>
  <!-- error info content -->
  {#if (error && error !== true) || errorSlot}
    <div class="{cls(c.errorInfo, c.error)}">
      {#if error !== true}{error}{/if}
      {@render errorSlot()}
    </div>
  {/if}
  {#if (info || infoSlot) && !error}
    <div class="{cls(c.errorInfo, c.info)}">
      {info}
      {@render infoSlot()}
    </div>
  {/if}
  <!-- error info end -->

  {#if type !== 'select'}
    {@render children()}
  {/if}
</ListItem>
