<script lang="ts">import { ActionsGroupClasses } from "../../../shared/classes/ActionsGroupClasses.js";
import { useThemeClasses } from "../shared/use-theme-classes.js";
let {
  class: className,
  ios,
  material,
  dividers,
  children,
  ...restProps
} = $props();
let c = $state(
  useThemeClasses(
    { ios, material },
    ActionsGroupClasses({ dividers }),
    (v) => c = v,
    className
  )
);
</script>

<div class="{c.base}" {...restProps}>
  {@render children()}
</div>
