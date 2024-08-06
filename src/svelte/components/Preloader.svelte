<script lang="ts">
  import { Snippet } from 'svelte';

  import { useTheme } from '../shared/use-theme.js';
  import { useThemeClasses } from '../shared/use-theme-classes.js';
  import { useDarkClasses } from '../shared/use-dark-classes.js';

  import PreloaderIOS from './icons/PreloaderIOS.svelte';
  import PreloaderMaterial from './icons/PreloaderMaterial.svelte';
  import { PreloaderClasses } from '../../shared/classes/PreloaderClasses.js';
  import { PreloaderColors } from '../../shared/colors/PreloaderColors.js';

  let {
    class: className,
    colors: colorsProp,
    ios,
    material,
    size = 'w-8 h-8',
    children,
    ...restProps
  }: {
    class?: string;
    colors?: string;
    ios?: boolean;
    material?: boolean;
    size?: string;
    children?: Snippet;
  } = $props();

  let theme = $derived(useTheme({ ios, material }, (v) => (theme = v)));

  const dark = useDarkClasses();
  let colors = $derived(PreloaderColors(colorsProp, dark));

  let c = $derived(
    useThemeClasses(
      { ios, material },
      PreloaderClasses({ size }, colors, theme),
      (v) => (c = v),
      className
    )
  );
</script>

<span class="{c.base}" {...restProps}>
  <span class="{c.inner}">
    {#if theme === 'ios'}
      <PreloaderIOS class="w-full h-full" />
    {:else}
      <PreloaderMaterial class="w-full h-full" />
    {/if}
  </span>
  {@render children()}
</span>
