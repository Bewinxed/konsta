<script lang="ts">
  import { Snippet } from 'svelte';

  import Button from './Button.svelte';

  let {
    active = false,
    strong = false,
    rounded = false,
    outline = false,
    clear = false,
    children,
    ...restProps
  }: {
    active?: boolean;
    strong?: boolean;
    rounded?: boolean;
    outline?: boolean;
    clear?: boolean;
    children?: Snippet;
  } = $props();

  // svelte-ignore unused-export-let
  // svelte-ignore unused-export-let
</script>

<Button
  segmented
  segmentedActive="{active}"
  segmentedStrong="{strong}"
  rounded="{rounded && strong}"
  {...restProps}
>
  {@render children()}
</Button>
