<script lang="ts">
  import type { Snippet } from '../types/svelte.js';

  import { BlockClasses } from '$konsta/classes/BlockClasses.js';
  import { BlockColors } from '$konsta/colors/BlockColors.js';
  import { cls } from '$konsta/cls.js';
  import { useDarkClasses } from '$shared/use-dark-classes.js';
  import { useTheme } from '$shared/use-theme.js';
  import { useThemeClasses } from '$shared/use-theme-classes.js';

  let {
    class: className,
    colors: colorsProp,
    ios,
    material,
    margin = 'my-8',
    padding = 'py-4',
    inset,
    insetIos = false,
    insetMaterial = false,
    strong,
    strongIos = false,
    strongMaterial = false,
    outline,
    outlineIos = false,
    outlineMaterial = false,
    nested,
    children,
    ...restProps
  }: {
    class?: string;
    colors?: {
      ios?: string;
      material?: string;
    };
    ios?: boolean;
    material?: boolean;
    margin?: string;
    padding?: string;
    inset?: boolean;
    insetIos?: boolean;
    insetMaterial?: boolean;
    strong?: boolean;
    strongIos?: boolean;
    strongMaterial?: boolean;
    outline?: boolean;
    outlineIos?: boolean;
    outlineMaterial?: boolean;
    nested?: boolean;
    children?: Snippet;
  } = $props();

  let theme = $state(useTheme({}, (v) => (theme = v)));

  const dark = useDarkClasses();

  let isStrong = $derived(
    typeof strong === 'undefined'
      ? theme === 'ios'
        ? strongIos
        : strongMaterial
      : strong
  );

  let isOutline = $derived(
    typeof outline === 'undefined'
      ? theme === 'ios'
        ? outlineIos
        : outlineMaterial
      : outline
  );

  let isInset = $derived(
    typeof inset === 'undefined'
      ? theme === 'ios'
        ? insetIos
        : insetMaterial
      : inset
  );

  let colors = $derived(BlockColors(colorsProp, dark));

  let c = $state(
    useThemeClasses(
      { ios, material },
      BlockClasses(
        {
          margin,
          padding,
          inset: isInset,
          outline: isOutline,
          strong: isStrong,
        },
        colors,
        className
      ),
      (v) => (c = v),
      ''
    )
  );

  let classes = $derived(
    cls(
      // base
      c.base,

      // inset
      isInset && c.inset,

      className
    )
  );
</script>

<div class="{classes}" {...restProps}>
  {@render children()}
</div>
