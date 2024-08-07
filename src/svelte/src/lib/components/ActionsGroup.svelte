<script lang="ts">
  import type { Snippet } from '../types/svelte.js';

  import { ActionsGroupClasses } from '$konsta/classes/ActionsGroupClasses.js';
  import { useThemeClasses } from '$shared/use-theme-classes.js';

  let {
    class: className,
    ios,
    material,
    dividers,
    children,
    ...restProps
  }: {
    class?: string;
    ios?: boolean;
    material?: boolean;
    dividers?: boolean;
    children?: Snippet;
  } = $props();

  let c = $state({});
  c = useThemeClasses(
    { ios, material },
    ActionsGroupClasses({ dividers }),
    (v) => (c = v),
    className
  );
</script>

<div class="{c.base}" {...restProps}>
  {@render children()}
</div>
