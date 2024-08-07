<script lang="ts">
  import type { Snippet } from '../types/svelte.js';
  import { ActionsClasses } from '$konsta/classes/ActionsClasses.js';
  import { useThemeClasses } from '$shared/use-theme-classes.js';

  // turn this to svelte 5 syntax
  let {
    class: className,
    ios,
    material,
    opened,
    backdrop,
    children,
    onBackdropClick,
    ...restProps
  }: {
    class?: string;
    ios?: boolean;
    material?: boolean;
    opened?: boolean;
    backdrop?: boolean;
    children: Snippet;
    onBackdropClick?: () => void;
  } = $props();

  let _state = $derived(opened ? 'opened' : 'closed');

  let c = $state({});
  c = useThemeClasses(
    { ios, material },
    ActionsClasses({}),
    undefined,
    className
  );
</script>

{#if backdrop}
  <div class="{c.backdrop[_state]}" onclick="{onBackdropClick}"></div>
{/if}
<div class="{c.base[_state]}" {...restProps}>
  {@render children()}
</div>
