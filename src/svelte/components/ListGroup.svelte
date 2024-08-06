<script lang="ts">
  import { Snippet } from 'svelte';

  import List from './List.svelte';

  let {
    children,
    ...restProps
  }: {
    children?: Snippet;
  } = $props();
</script>

<li>
  <List nested {...restProps}>
    {@render children()}
  </List>
</li>
