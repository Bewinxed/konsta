<script lang="ts">
import { Snippet } from "svelte";

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
