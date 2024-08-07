<script lang="ts">import ListItem from "./ListItem.svelte";
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
