<script lang="ts">
  import type { Snippet } from '../types/svelte.js';

  import { cls } from '$konsta/cls.js';
  import { ListClasses } from '$konsta/classes/ListClasses.js';
  import { ListColors } from '$konsta/colors/ListColors.js';
  import { useDarkClasses } from '$shared/use-dark-classes.js';
  import { useThemeClasses } from '$shared/use-theme-classes.js';
  import { useTheme } from '$shared/use-theme.js';
  import { setReactiveContext } from '$shared/set-reactive-context.js';

  let {
    class: className,
    colors: colorsProp,
    ios,
    material,
    margin = 'my-8',
    dividers,
    dividersIos = true,
    dividersMaterial = false,
    inset,
    insetIos,
    insetMaterial,
    strong,
    strongIos,
    strongMaterial,
    outline,
    outlineIos,
    outlineMaterial,
    nested = false,
    menuList = false,
    children,
    ...restProps
  }: {
    class?: string;
    colors?: string;
    ios?: boolean;
    material?: boolean;
    margin?: string;
    dividers?: boolean;
    dividersIos?: boolean;
    dividersMaterial?: boolean;
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
    menuList?: boolean;
    children?: Snippet;
  } = $props();

  let theme;
  theme = useTheme({}, (v) => (theme = v));

  const dark = useDarkClasses();

  /* eslint-disable */
  const hasDividers = () =>
    typeof dividers === 'undefined'
      ? theme === 'ios'
        ? dividersIos
        : dividersMaterial
      : dividers;
  /* eslint-enable */
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

  // eslint-disable-next-line
  setReactiveContext('ListDividersContext', () => {
    return {
      value: hasDividers(),
    };
  });

  let colors = $derived(ListColors(colorsProp, dark));

  let c = $state({});
  c = useThemeClasses(
    { ios, material },
    ListClasses(
      {
        nested,
        margin,
        inset: isInset,
        outline: isOutline,
        strong: isStrong,
      },
      colors,
      className
    ),
    (v) => (c = v),
    ''
  );

  let classes = $derived(
    cls(
      c.value.base,
      isInset && c.value.inset,
      menuList && c.value.menuList,
      className
    )
  );
</script>

<div class="{classes}" {...restProps}>
  <ul class="{c.ul}">
    {@render children()}
  </ul>
</div>
