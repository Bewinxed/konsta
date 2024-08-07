<script lang="ts">import List from "./List.svelte";
let {
  children,
  ...restProps
} = $props();
</script>

<li>
  <List nested {...restProps}>
    {@render children()}
  </List>
</li>
