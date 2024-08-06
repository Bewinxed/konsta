<script lang="ts">
  import { Snippet } from 'svelte';

  import { onMount,  } from 'svelte';
  import { useTheme } from '../shared/use-theme.js';
  import { useThemeClasses } from '../shared/use-theme-classes.js';
  import { useDarkClasses } from '../shared/use-dark-classes.js';
  import { ToolbarClasses } from '../../shared/classes/ToolbarClasses.js';
  import { ToolbarColors } from '../../shared/colors/ToolbarColors.js';

  let {
    class: className,
    colors: colorsProp,
    ios,
    material,
    translucent = true,
    bgClass = '',
    innerClass = '',
    outline,
    tabbar = false,
    tabbarLabels = false,
    tabbarIcons = false,
    top = false,
    children,
    ...restProps
  }: {
    class?: string;
    colors?: string;
    ios?: boolean;
    material?: boolean;
    translucent?: boolean;
    bgClass?: string;
    innerClass?: string;
    outline?: boolean;
    tabbar?: boolean;
    tabbarLabels?: boolean;
    tabbarIcons?: boolean;
    top?: boolean;
    children?: Snippet;
  } = $props();

  let highlightElRef = $state<HTMLElement>();

  let theme = $state(useTheme({ ios, material }, (v) => (theme = v)));

  let highlightStyle = $state({
    transform: '',
    width: '',
  });

  let isOutline = $derived(
    typeof outline === 'undefined' ? theme === 'ios' : outline
  );

  let hasHighlight = $derived(theme === 'material' && tabbar && !tabbarIcons);

  const setHighlight = () => {
    if (hasHighlight && highlightElRef) {
      const linksEl = highlightElRef.previousElementSibling;
      const activeIndex = [...linksEl.children].indexOf(
        linksEl.querySelector('.k-tabbar-link-active')
      );
      const width = `${(1 / linksEl.children.length) * 100}%`;
      const transform = `translateX(${activeIndex * 100}%)`;

      if (
        width !== highlightStyle.width ||
        transform !== highlightStyle.transform
      ) {
        highlightStyle = {
          ...highlightStyle,
          width,
          transform,
        };
      }
    }
  };
  onMount(() => setHighlight());
  $effect(() => setHighlight());

  const dark = useDarkClasses();

  let colors = $derived(ToolbarColors(colorsProp, dark));

  let c = $state(
    useThemeClasses(
      { ios, material },
      ToolbarClasses(
        {
          outline: isOutline,
          translucent,
          bgClass,
          innerClass,
          tabbar,
          top,
          tabbarIcons,
          tabbarLabels,
        },
        colors
      ),
      (v) => (c = v),
      className
    )
  );
</script>

<div class="{c.base}" {...restProps}>
  <div class="{c.bg}"></div>
  <div class="{c.inner}">
    {@render children()}
  </div>
  {#if hasHighlight}
    <span
      class="{c.highlight}"
      style="{`width: ${highlightStyle.width} ; transform: ${highlightStyle.transform}`}"
      bind:this="{highlightElRef}"
    ></span>
  {/if}
</div>
