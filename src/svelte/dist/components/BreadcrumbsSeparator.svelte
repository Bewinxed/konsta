<script lang="ts">import { BreadcrumbsSeparatorClasses } from "../../../shared/classes/BreadcrumbsSeparatorClasses.js";
import { useThemeClasses } from "../shared/use-theme-classes.js";
import ChevronIcon from "./icons/ChevronIcon.svelte";
let {
  class: className,
  ios,
  material,
  children,
  ...restProps
} = $props();
let c = $state(
  useThemeClasses(
    { ios, material },
    BreadcrumbsSeparatorClasses(),
    (v) => c = v,
    className
  )
);
</script>

<div class="{c.base}" {...restProps}>
  <ChevronIcon class="{c.icon}" />
  {@render children()}
</div>
