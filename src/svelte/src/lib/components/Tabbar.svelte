<script lang="ts">
  import type { Snippet } from '../types/svelte.js';

  import Toolbar from './Toolbar.svelte';

  let {
    labels = false,
    icons = false,
    children,
    ...restProps
  }: {
    labels?: boolean;
    icons?: boolean;
    children: Snippet;
  } = $props();
</script>

<Toolbar tabbar tabbarLabels="{labels}" tabbarIcons="{icons}" {...restProps}>
  {@render children()}
</Toolbar>
