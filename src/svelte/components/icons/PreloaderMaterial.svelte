<script lang="ts">
  import { Snippet } from 'svelte';

  let {
    class: className,
    children,
    ...restProps
  }: {
    class?: string;
    children?: Snippet;
  } = $props();
</script>

<svg viewBox="0 0 36 36" {...restProps} fill="none" stroke="currentcolor">
  <circle cx="18" cy="18" r="16"></circle>
</svg>
