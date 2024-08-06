<script lang="ts">
  import { Snippet } from 'svelte';

  import Toolbar from './Toolbar.svelte';

  let {
    labels = false,
    icons = false,
    children,
    ...restProps
  }: {
    labels?: boolean;
    icons?: boolean;
    children?: Snippet;
  } = $props();
</script>

<Toolbar tabbar tabbarLabels="{labels}" tabbarIcons="{icons}" {...restProps}>
  {@render children()}
</Toolbar>
