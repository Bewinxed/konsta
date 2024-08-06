<script lang="ts">
  import { ActionsClasses } from '../../shared/classes/ActionsClasses.js';
  import { useThemeClasses } from '../shared/use-theme-classes';

  // turn this to svelte 5 syntax
  let {
    class: className,
    ios,
    material,
    opened,
    backdrop,
    onBackdropClick,
    ...restProps
  }: {
    class?: string;
    ios?: boolean;
    material?: boolean;
    opened?: boolean;
    backdrop?: boolean;
    onBackdropClick?: () => void;
  } = $props();

  let state = $derived(opened ? 'opened' : 'closed');

  let c = $derived(useThemeClasses({ ios, material }, ActionsClasses({}), undefined, className));
</script>

{#if backdrop}
  <div class={c.backdrop[state]} onclick={onBackdropClick} />
{/if}
<div class={c.base[state]} {...restProps}>
  <slot />
</div>
