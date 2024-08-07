<script lang="ts">import { TableHeadClasses } from "../../../shared/classes/TableHeadClasses.js";
import { useThemeClasses } from "../shared/use-theme-classes.js";
let {
  class: className,
  ios,
  material,
  children,
  ...restProps
} = $props();
let rippleEl = $state({ current: null });
let c = $state({});
c = useThemeClasses(
  { ios, material },
  TableHeadClasses(),
  (v) => c = v,
  className
);
</script>

<thead bind:this="{rippleEl.current}" class="{c.base}" {...restProps}>
  {@render children()}
</thead>
