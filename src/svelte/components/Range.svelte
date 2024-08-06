<script lang="ts">
  import { Snippet } from 'svelte';

  import { cls } from '../../shared/cls.js';
  import { RangeClasses } from '../../shared/classes/RangeClasses.js';
  import { RangeColors } from '../../shared/colors/RangeColors.js';
  import { useDarkClasses } from '../shared/use-dark-classes.js';
  import { useThemeClasses } from '../shared/use-theme-classes.js';

  let {
    class: className,
    colors: colorsProp,
    ios,
    material,
    inputId,
    name,
    value,
    readonly,
    disabled,
    step = 1,
    min = 0,
    max = 100,
    onInput,
    onChange,
    onFocus,
    onBlur,
    children,
    ...restProps
  }: {
    class?: string;
    colors?: string;
    ios?: boolean;
    material?: boolean;
    inputId?: string;
    name?: string;
    value?: any;
    readonly?: boolean;
    disabled?: boolean;
    step?: number;
    min?: number;
    max?: number;
    onInput?: (e: any) => void;
    onChange?: (e: any) => void;
    onFocus?: (e: any) => void;
    onBlur?: (e: any) => void;
    children?: Snippet;
  } = $props();

  const dark = useDarkClasses();

  let colors = $derived(RangeColors(colorsProp, dark));

  let c = $state(
    useThemeClasses(
      { ios, material },
      RangeClasses({}, colors, dark),
      (v) => (c = v),
      className
    )
  );

  let valueWidth = $derived((((value || 0) - min) / (max - min)) * 100);
</script>

<div class="{c.base}" {...restProps}>
  <span class="{c.trackBg}"></span>
  <span class="{c.trackValue}" style="{`width: ${valueWidth}%`}"></span>
  <input
    class="{cls(c.input, c.inputThumb, c.inputTrack)}"
    type="range"
    id="{inputId}"
    {name}
    {min}
    {max}
    {step}
    {value}
    {readonly}
    {disabled}
    oninput="{onInput}"
    onchange="{onChange}"
    onfocus="{onFocus}"
    onblur="{onBlur}"
  />
</div>
