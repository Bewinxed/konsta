<script lang="ts">
  import { Snippet } from 'svelte';

  import { useTheme } from '../shared/use-theme.js';
  import { useThemeClasses } from '../shared/use-theme-classes.js';
  import Badge from './Badge.svelte';
  import { IconClasses } from '../../shared/classes/IconClasses.js';
  import { printText } from '../shared/print-text.js';

  let {
    class: className,
    ios,
    material,
    badge = '',
    badgeColors,
    children,
    iosSlot,
    materialSlot,
    ...restProps
  }: {
    class?: string;
    ios?: any;
    material?: any;
    badge?: string;
    badgeColors?: any;
    children?: Snippet;
    iosSlot?: Snippet;
    materialSlot?: Snippet;
  } = $props();

  let theme = $derived(useTheme({}, (v) => (theme = v)));

  let c = $derived(
    useThemeClasses({}, IconClasses({}, className), (v) => (c = v), className)
  );
</script>

<i class="{c.base}" {...restProps}>
  {#if theme === 'ios'}
    {printText(ios || '')}
    {@render iosSlot()}
  {:else}
    {printText(material || '')}
    {@render materialSlot()}
  {/if}

  {#if typeof badge !== 'undefined' && badge !== null && badge !== ''}
    <Badge small class="{c.badge}" colors="{badgeColors}">
      {printText(badge)}
    </Badge>
  {/if}
  {@render children()}
</i>
