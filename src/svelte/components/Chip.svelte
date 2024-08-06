<script lang="ts">
  import { Snippet } from 'svelte';

  import { ChipClasses } from '../../shared/classes/ChipClasses.js';
  import { ChipColors } from '../../shared/colors/ChipColors.js';
  import { useDarkClasses } from '../shared/use-dark-classes.js';
  import { useThemeClasses } from '../shared/use-theme-classes.js';
  import { useTheme } from '../shared/use-theme.js';

  import DeleteIcon from './icons/DeleteIcon.svelte';

  let {
    class: className,
    colors: colorsProp,
    ios,
    material,
    deleteButton,
    onDelete,
    outline = false,
    onClick,
    children,
    ...restProps
  }: {
    class?: string;
    colors?: any;
    ios?: any;
    material?: any;
    deleteButton?: boolean;
    onDelete?: () => void;
    outline?: boolean;
    onClick?: () => void;
    children?: Snippet;
  } = $props();

  const dark = useDarkClasses();

  let theme = $derived(useTheme({}, (v) => (theme = v)));

  let style = $derived(outline ? 'outline' : 'fill');

  let colors = $derived(ChipColors(colorsProp, dark));

  let c = $derived(
    useThemeClasses({ ios, material }, ChipClasses({}, colors), (v) => (c = v))
  );
</script>

<div class="{c.base[style]}" {...restProps} onclick="{onClick}">
  {#if $$slots.media}
    <div class="{c.media}"><slot name="media" /></div>
  {/if}
  {@render children()}
  {#if deleteButton}
    <div
      class="{c.deleteButton}"
      role="button"
      tabindex="0"
      onclick="{onDelete}"
    >
      <DeleteIcon {theme} class="h-4 w-4" />
    </div>
  {/if}
</div>
