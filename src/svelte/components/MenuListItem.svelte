<script lang="ts">
  import { Snippet } from 'svelte';

  import ListItem from './ListItem.svelte';

  let {
    active = false,
    href,
    children,
    titleSlot,
    subtitleSlot,
    mediaSlot,
    headerSlot,
    innerSlot,
    contentSlot,
    textSlot,
    footerSlot,
    afterSlot,
    ...restProps
  }: {
    active?: boolean;
    href?: boolean | string;
    titleSlot?: Snippet;
    subtitleSlot?: Snippet;
    mediaSlot?: Snippet;
    headerSlot?: Snippet;
    innerSlot?: Snippet;
    contentSlot?: Snippet;
    textSlot?: Snippet;
    footerSlot?: Snippet;
    afterSlot?: Snippet;
    children?: Snippet;
  } = $props();
</script>

<ListItem
  {titleSlot}
  {subtitleSlot}
  {mediaSlot}
  {headerSlot}
  {innerSlot}
  {contentSlot}
  {textSlot}
  {footerSlot}
  {afterSlot}
  menuListItem
  menuListItemActive="{active}"
  href="{href || false}"
  {...restProps}
>
  {@render children()}
</ListItem>
