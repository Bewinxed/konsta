<script lang="ts">import { useThemeClasses } from "../shared/use-theme-classes.js";
import { useDarkClasses } from "../shared/use-dark-classes.js";
import { useTouchRipple } from "../shared/use-touch-ripple.svelte.js";
import { ListButtonClasses } from "../../../shared/classes/ListButtonClasses.js";
import { ListButtonColors } from "../../../shared/colors/ListButtonColors.js";
import { useTheme } from "../shared/use-theme.js";
import { getReactiveContext } from "../shared/get-reactive-context.js";
let {
  class: className,
  colors: colorsProp,
  ios,
  material,
  href,
  target,
  type,
  value,
  linkProps = {},
  touchRipple = true,
  linkComponent = "a",
  children,
  ...restProps
} = $props();
let ListDividersContext = $state(
  getReactiveContext("ListDividersContext", (value2) => {
    ListDividersContext = value2 || {};
  }) || { value: false }
);
let rippleEl = $state({ current: null });
let theme = $state("");
theme = useTheme({ ios, material }, (v) => theme = v);
$effect(() => useTouchRipple(rippleEl, touchRipple));
const dark = useDarkClasses();
let colors = $derived(ListButtonColors(colorsProp, dark));
let c = $state({});
c = useThemeClasses(
  { ios, material },
  ListButtonClasses(
    { dividers: ListDividersContext.value },
    colors,
    className
  ),
  (v) => c = v,
  className
);
let isLink = $derived(!!href || href === "");
let hrefComputed = $derived(
  !isLink || href === true || href === false ? void 0 : href || ""
);
let buttonAttrs = $derived({
  href: hrefComputed,
  target,
  type,
  value,
  ...linkProps
});
const ButtonComponent = isLink ? linkComponent : "button";
</script>

<li class="{c.base}" {...restProps}>
  {#if typeof ButtonComponent === 'string'}
    <!-- svelte-ignore a11y-missing-attribute -->
    <svelte:element
      this="{ButtonComponent}"
      bind:this="{rippleEl.current}"
      class="{c.button}"
      {...buttonAttrs}
    >
      {@render children()}
    </svelte:element>
  {:else}
    <ButtonComponent
      this="{ButtonComponent}"
      bind:this="{rippleEl.current}"
      class="{c.button}"
      {...buttonAttrs}
    >
      {@render children()}
    </ButtonComponent>
  {/if}
</li>
