<script lang="ts">
  import type { Snippet } from '../types/svelte.js';

  import List from './List.svelte';

  let {
    children,
    ...restProps
  }: {
    children?: Snippet;
  } = $props();
</script>

<List menuList {...restProps}>
  {@render children()}
</List>
