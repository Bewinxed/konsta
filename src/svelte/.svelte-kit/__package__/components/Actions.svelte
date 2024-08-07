<script lang="ts">import { ActionsClasses } from "../../../shared/classes/ActionsClasses.js";
import { useThemeClasses } from "../shared/use-theme-classes.js";
let {
  class: className,
  ios,
  material,
  opened,
  backdrop,
  children,
  onBackdropClick,
  ...restProps
} = $props();
let _state = $derived(opened ? "opened" : "closed");
let c = $state(
  useThemeClasses({ ios, material }, ActionsClasses({}), void 0, className)
);
</script>

{#if backdrop}
  <div class="{c.backdrop[_state]}" onclick="{onBackdropClick}"></div>
{/if}
<div class="{c.base[_state]}" {...restProps}>
  {@render children()}
</div>
