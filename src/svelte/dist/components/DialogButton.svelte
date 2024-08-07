<script lang="ts">import { useThemeClasses } from "../shared/use-theme-classes.js";
import { useTheme } from "../shared/use-theme.js";
import { useDarkClasses } from "../shared/use-dark-classes.js";
import { DialogButtonClasses } from "../../../shared/classes/DialogButtonClasses.js";
import { DialogButtonColors } from "../../../shared/colors/DialogButtonColors.js";
import Button from "./Button.svelte";
let {
  class: className,
  colors: colorsProp,
  ios,
  material,
  component: ElComponent = "button",
  disabled = false,
  strong,
  strongIos,
  strongMaterial,
  onClick,
  children,
  ...restProps
} = $props();
let theme = $state(useTheme({}, (v) => theme = v));
let isStrong = $derived(
  typeof strong === "undefined" ? theme === "ios" ? strongIos : strongMaterial : strong
);
let attrs = $derived({
  ...restProps
});
const dark = useDarkClasses();
let colors = $derived(DialogButtonColors(colorsProp, dark));
let c = $state(
  useThemeClasses(
    { ios, material },
    DialogButtonClasses({ disabled, strong: isStrong }, colors),
    (v) => c = v,
    className
  )
);
</script>

{#if theme === 'ios'}
  {#if typeof ElComponent === 'string'}
    <svelte:element
      this="{ElComponent}"
      class="{c.base}"
      {disabled}
      {...attrs}
      role="button"
      tabindex="0"
      onclick="{onClick}"
    >
      {@render children()}
    </svelte:element>
  {:else}
    <ElComponent
      this="{ElComponent}"
      class="{c.base}"
      {disabled}
      {...attrs}
      onclick="{onClick}"
    >
      {@render children()}
    </ElComponent>
  {/if}
{:else}
  <Button
    component="{ElComponent}"
    inline
    rounded
    {disabled}
    clear="{!isStrong}"
    class="{className}"
    {onClick}
    {...attrs}
  >
    {@render children()}
  </Button>
{/if}
