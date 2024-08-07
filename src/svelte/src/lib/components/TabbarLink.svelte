<script lang="ts">
  import type { Snippet } from '../types/svelte.js';

  import { TabbarLinkClasses } from '$konsta/classes/TabbarLinkClasses.js';
  import { TabbarLinkColors } from '$konsta/colors/TabbarLinkColors.js';
  import { useThemeClasses } from '$shared/use-theme-classes.js';
  import { useDarkClasses } from '$shared/use-dark-classes.js';
  import { printText } from '$shared/print-text.js';

  import Link from './Link.svelte';

  let {
    class: className,
    colors: colorsProp,
    ios,
    material,
    linkProps = {},
    active = false,
    label,
    children,
    iconSlot,
    labelSlot,
    ...restProps
  }: {
    class?: string;
    colors?: string;
    ios?: boolean;
    material?: boolean;
    linkProps?: any;
    active?: boolean;
    label?: string;
    children: Snippet;
    iconSlot?: Snippet;
    labelSlot?: Snippet;
  } = $props();

  const dark = useDarkClasses();

  let colors = $derived(TabbarLinkColors(colorsProp, dark));

  let hasIcon = $derived(iconSlot);
  let hasLabel = $derived(label || labelSlot || children);

  let c = $state({});
  c = useThemeClasses(
    { ios, material },
    TabbarLinkClasses({ hasLabel, hasIcon, active }, colors),

    (v) => (c = v),
    ''
  );
</script>

<Link
  tabbar
  tabbarActive="{active}"
  class="{className}"
  {...restProps}
  {...linkProps}
>
  <span class="{c.content}">
    {#if hasIcon && iconSlot}
      <span class="{c.iconContainer}">
        <span class="{c.iconBg}"></span>
        {@render iconSlot()}
      </span>
    {/if}
    {#if hasLabel}
      <span class="{c.label}">
        {#if labelSlot}
          {@render labelSlot()}
        {:else}
          {printText(label)}
          {@render children()}
        {/if}
      </span>
    {/if}
  </span>
</Link>
