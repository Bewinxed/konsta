<script lang="ts">
  import type { Snippet } from '../types/svelte.js';

  import { BreadcrumbsClasses } from '$konsta/classes/BreadcrumbsClasses.js';
  import { useThemeClasses } from '$shared/use-theme-classes.js';

  let {
    class: className,
    ios,
    material,
    fontSizeIos = 'text-[17px]',
    fontSizeMaterial = 'text-[14px]',
    children,
    ...restProps
  }: {
    class?: string;
    ios?: any;
    material?: any;
    fontSizeIos?: any;
    fontSizeMaterial?: any;
    children?: Snippet;
  } = $props();

  let c = $state({});
  c = useThemeClasses(
    { ios, material },
    BreadcrumbsClasses({ fontSizeIos, fontSizeMaterial }),
    (v) => (c = v),
    className
  );
</script>

<div class="{c.base}" {...restProps}>
  {@render children()}
</div>
