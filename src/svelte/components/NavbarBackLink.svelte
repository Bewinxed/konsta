<script lang="ts">
  import { Snippet } from 'svelte';

  import { useTheme } from '../shared/use-theme.js';
  import { useThemeClasses } from '../shared/use-theme-classes.js';
  import BackIcon from './icons/BackIcon.svelte';
  import Link from './Link.svelte';
  import { NavbarBackLinkClasses } from '../../shared/classes/NavbarBackLinkClasses.js';
  import { printText } from '../shared/print-text.js';

  let {
    class: className,
    ios,
    material,
    component = 'a',
    text = 'Back',
    showText = 'auto',
    onClick,
    children,
    ...restProps
  }: {
    class?: string;
    ios?: boolean;
    material?: boolean;
    component?: string;
    text?: string;
    showText?: boolean | 'auto';
    onClick?: (e: any) => void;
    children?: Snippet;
  } = $props();

  let theme = $derived(useTheme({ ios, material }, (v) => (theme = v)));

  let shouldShowText = $derived(
    (showText === 'auto' && theme === 'ios') || showText === true
  );

  let c = $derived(
    useThemeClasses(
      { ios, material },
      NavbarBackLinkClasses(),
      (v) => (c = v),
      className
    )
  );
</script>

<Link class="{c.base}" navbar {component} {...restProps} {onClick}>
  <span class="{c.icon}">
    <BackIcon {theme} />
  </span>
  {#if shouldShowText}
    <span>{printText(text)}</span>
  {/if}
  {@render children()}
</Link>
