<script lang="ts">import { cls } from "../../../shared/cls.js";
import { useTheme } from "../shared/use-theme.js";
import { useThemeClasses } from "../shared/use-theme-classes.js";
import { useTouchRipple } from "../shared/use-touch-ripple.svelte.js";
import ChevronIcon from "./icons/ChevronIcon.svelte";
import { useDarkClasses } from "../shared/use-dark-classes.js";
import { ListItemClasses } from "../../../shared/classes/ListItemClasses.js";
import { ListItemColors } from "../../../shared/colors/ListItemColors.js";
import { getReactiveContext } from "../shared/get-reactive-context.js";
import { printText } from "../shared/print-text.js";
let {
  class: className,
  colors: colorsProp,
  ios,
  material,
  component = "li",
  mediaClass = "",
  innerClass = "",
  contentClass = "",
  titleWrapClass = "",
  titleFontSizeIos = "text-[17px]",
  titleFontSizeMaterial = "text-[16px]",
  withMedia,
  withTitle,
  title = "",
  subtitle = "",
  text = "",
  after = "",
  header = "",
  footer = "",
  menuListItem = false,
  menuListItemActive = false,
  groupTitle = false,
  strongTitle = "auto",
  label = false,
  chevron,
  chevronIos = true,
  chevronMaterial = true,
  href,
  target,
  dividers,
  contacts = false,
  link = false,
  linkComponent = "a",
  linkProps = {},
  touchRipple = true,
  onClick,
  headerSlot,
  mediaSlot,
  titleSlot,
  subtitleSlot,
  textSlot,
  innerSlot,
  contentSlot,
  footerSlot,
  afterSlot,
  children,
  ...restProps
} = $props();
let ListDividersContext = $state(
  getReactiveContext("ListDividersContext", (value) => {
    ListDividersContext = value || {};
  }) || { value: false }
);
let rippleEl = $state({ current: null });
let theme = $state(useTheme({ ios, material }, (v) => theme = v));
const dark = useDarkClasses();
let hasChevron = $derived(
  typeof chevron === "undefined" ? theme === "ios" ? chevronIos : chevronMaterial : chevron
);
let colors = $derived(ListItemColors(colorsProp, dark));
let isMenuListItemActive = $derived(menuListItem && menuListItemActive);
let textColor = $derived(
  colors[`${isMenuListItemActive ? "menuListItemActiveText" : menuListItem ? "menuListItemText" : "text"}${theme === "ios" ? "Ios" : "Material"}`]
);
let isLink = $derived(!!href || href === "" || menuListItem || link);
let isLabel = $derived(!!label);
let needsTouchRipple = $derived(
  theme === "material" && (isLabel || isLink) && touchRipple
);
$effect(() => useTouchRipple(rippleEl, needsTouchRipple));
let hrefComputed = $derived(
  href === true || href === false || typeof href === "undefined" ? void 0 : href || ""
);
let ItemContentComponent = $derived(
  isLink ? linkComponent : isLabel ? "label" : "div"
);
let linkPropsComputed = $derived(
  isLink ? { href: hrefComputed, target, ...linkProps } : {}
);
let isMediaItem = $derived(
  (title || titleSlot) && withTitle !== false && (subtitle || text || subtitleSlot || textSlot)
);
let autoStrongTitle = $derived(
  strongTitle === "auto" && (title || titleSlot) && withTitle !== false && (subtitle || text || subtitleSlot || textSlot)
);
let c = $state(
  useThemeClasses(
    { ios, material },
    ListItemClasses(
      {
        menuListItem,
        dividers: typeof dividers === "undefined" ? ListDividersContext.value : dividers,
        mediaClass,
        innerClass,
        contentClass,
        titleWrapClass,
        titleFontSizeIos,
        titleFontSizeMaterial,
        strongTitle,
        contacts: contacts === "false" ? "" : contacts
      },
      colors,
      {
        isMediaItem,
        theme,
        textColor,
        needsTouchRipple,
        isMenuListItemActive,
        darkClasses: dark,
        autoStrongTitle,
        className
      }
    ),
    (v) => c = v,
    className
  )
);
let itemContentClasses = $derived(
  isLink || isLabel ? c.itemContent.link : c.itemContent.default
);
let titleClasses = $derived(
  menuListItem ? c.title.menuListItem : strongTitle === true || autoStrongTitle ? c.title.strong : c.title.default
);
</script>

{#if groupTitle}
  <svelte:element
    this="{component}"
    class="{cls(c.groupTitle, className)}"
    onclick="{onClick}"
  >
    {title}
    {@render titleSlot()}
    {@render children()}
  </svelte:element>
{:else}
  <svelte:element
    this="{component}"
    class="{c.base}"
    {...restProps}
    onclick="{onClick}"
  >
    {#if typeof ItemContentComponent === 'string'}
      <svelte:element
        this="{ItemContentComponent}"
        bind:this="{rippleEl.current}"
        class="{itemContentClasses}"
        {...linkPropsComputed}
      >
        {#if mediaSlot && withMedia !== false}
          <div class="{c.media}">{@render mediaSlot()}</div>
        {/if}
        <div class="{c.inner}">
          {#if header || headerSlot}
            <div class="{c.header}">
              {printText(header)}{@render headerSlot()}
            </div>
          {/if}
          {#if ((title || titleSlot) && withTitle !== false) || after || afterSlot}
            <div class="{c.titleWrap}">
              {#if (title || titleSlot) && withTitle !== false}
                <div class="{titleClasses}">
                  {printText(title)}
                  {@render titleSlot()}
                </div>
              {/if}
              {#if after || afterSlot}
                <div class="{c.after}">
                  {printText(after)}
                  {@render afterSlot()}
                </div>
              {/if}
              {#if isLink && hasChevron && !menuListItem}
                <ChevronIcon class="{c.chevron}" />
              {/if}
            </div>
          {/if}
          {#if subtitle || subtitleSlot}
            <div class="{c.subtitle}">
              {printText(subtitle)}{@render subtitleSlot()}
            </div>
          {/if}
          {#if text || textSlot}
            <div class="{c.text}">{printText(text)}{@render textSlot()}</div>
          {/if}
          {#if footer || footerSlot}
            <div class="{c.footer}">
              {printText(footer)}{@render footerSlot()}
            </div>
          {/if}
          {@render innerSlot()}
        </div>
        {@render contentSlot()}
      </svelte:element>
    {:else}
      <svelte:component
        this="{ItemContentComponent}"
        bind:this="{rippleEl.current}"
        class="{itemContentClasses}"
        {...linkPropsComputed}
      >
        {#if mediaSlot}
          <div class="{c.media}">{@render mediaSlot()}</div>
        {/if}
        <div class="{c.inner}">
          {#if header || headerSlot}
            <div class="{c.header}">
              {printText(header)}{@render headerSlot()}
            </div>
          {/if}
          {#if ((title || titleSlot) && withTitle !== false) || after || afterSlot}
            <div class="{c.titleWrap}">
              {#if (title || titleSlot) && withTitle !== false}
                <div class="{titleClasses}">
                  {printText(title)}
                  {@render titleSlot()}
                </div>
              {/if}
              {#if after || afterSlot}
                <div class="{c.after}">
                  {printText(after)}
                  {@render afterSlot()}
                </div>
              {/if}
              {#if isLink && hasChevron && !menuListItem}
                <ChevronIcon class="{c.chevron}" />
              {/if}
            </div>
          {/if}
          {#if subtitle || subtitleSlot}
            <div class="{c.subtitle}">
              {printText(subtitle)}{@render subtitleSlot()}
            </div>
          {/if}
          {#if text || textSlot}
            <div class="{c.text}">{printText(text)}{@render textSlot()}</div>
          {/if}
          {#if footer || footerSlot}
            <div class="{c.footer}">
              {printText(footer)}{@render footerSlot()}
            </div>
          {/if}
          {@render innerSlot()}
        </div>
        {@render contentSlot()}
      </svelte:component>
    {/if}
    {@render children()}
  </svelte:element>
{/if}
