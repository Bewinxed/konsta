<script lang="ts">import { onMount, onDestroy } from "svelte";
import { useTheme } from "../shared/use-theme.js";
import { useThemeClasses } from "../shared/use-theme-classes.js";
import { useDarkClasses } from "../shared/use-dark-classes.js";
import { NavbarClasses } from "../../../shared/classes/NavbarClasses.js";
import { NavbarColors } from "../../../shared/colors/NavbarColors.js";
import { printText } from "../shared/print-text.js";
let {
  class: className,
  bgClass = "",
  innerClass = "",
  leftClass = "",
  titleClass = "",
  subtitleClass = "",
  rightClass = "",
  subnavbarClass = "",
  colors: colorsProp,
  translucent = true,
  outline,
  centerTitle,
  medium = false,
  large = false,
  transparent = false,
  fontSizeIos = "text-[17px]",
  fontSizeMaterial = "text-[16px]",
  titleFontSizeIos = "text-[17px]",
  titleFontSizeMaterial = "text-[22px]",
  titleMediumFontSizeIos = "text-[24px]",
  titleMediumFontSizeMaterial = "text-[24px]",
  titleLargeFontSizeIos = "text-[34px]",
  titleLargeFontSizeMaterial = "text-[28px]",
  scrollEl,
  title,
  subtitle,
  ios,
  material,
  children,
  leftSlot,
  titleSlot,
  subtitleSlot,
  rightSlot,
  subnavbarSlot,
  ...restProps
} = $props();
let elRef = $state();
let titleContainerHeight = $state(0);
let bgElRef = $state(null);
let innerElRef = $state(null);
let titleContainerElRef = $state(null);
let titleElRef = $state(null);
let subnavbarElRef = $state(null);
let isScrollable = $derived(medium || large || transparent);
let wasScrollable = $state(isScrollable);
const dark = useDarkClasses();
let theme = $state(useTheme((v) => theme = v));
let colors = $derived(NavbarColors(colorsProp, dark));
let isOutline = $derived(
  typeof outline === "undefined" ? theme === "ios" : outline
);
let c = $state({});
c = useThemeClasses(
  { ios, material },
  NavbarClasses(
    {
      bgClass,
      innerClass,
      leftClass,
      titleClass,
      subtitleClass,
      rightClass,
      subnavbarClass,
      translucent,
      transparent,
      outline: isOutline,
      fontSizeIos,
      fontSizeMaterial,
      titleFontSizeIos,
      titleFontSizeMaterial,
      medium,
      large,
      titleMediumFontSizeIos,
      titleMediumFontSizeMaterial,
      titleLargeFontSizeIos,
      titleLargeFontSizeMaterial,
      centerTitle: typeof centerTitle === "undefined" ? theme === "ios" : centerTitle
    },
    colors
  ),
  (v) => c = v,
  className
);
const getScrollEl = () => {
  if (typeof scrollEl === "undefined") {
    return elRef && elRef.parentNode;
  }
  return scrollEl || scrollEl;
};
const onScroll = (e) => {
  let target;
  if (!e || !e.target) {
    target = getScrollEl();
  }
  const { scrollTop } = target;
  if (!isScrollable) {
    if (wasScrollable) {
      if (titleElRef) {
        titleElRef.style.opacity = "";
      }
      if (bgElRef) {
        bgElRef.style.opacity = "";
      }
    }
    return;
  }
  const maxTranslate = titleContainerHeight;
  const scrollProgress = Math.max(Math.min(scrollTop / maxTranslate, 1), 0);
  bgElRef.style.opacity = transparent ? -0.5 + scrollProgress * 1.5 : "";
  if (medium || large) {
    bgElRef.style.transform = `translateY(-${scrollProgress * maxTranslate}px)`;
  }
  if (titleContainerElRef) {
    titleContainerElRef.style.transform = `translateY(-${scrollProgress * maxTranslate}px)`;
    titleContainerElRef.style.opacity = 1 - scrollProgress * 2;
  }
  if (titleElRef) {
    titleElRef.style.opacity = -0.5 + scrollProgress * 1.5;
  }
  if ((medium || large) && subnavbarElRef) {
    subnavbarElRef.style.transform = `translateY(-${scrollProgress * maxTranslate}px)`;
  }
};
const calcSize = () => {
  if (titleContainerElRef) {
    titleContainerHeight = titleContainerElRef.offsetHeight;
  } else {
    titleContainerHeight = innerElRef.offsetHeight;
  }
};
const initScroll = () => {
  if (!isScrollable) {
    if (wasScrollable) {
      onScroll({ target: { scrollTop: 0 } });
      wasScrollable = isScrollable;
    }
    return;
  }
  wasScrollable = isScrollable;
  const scrollElLocal = getScrollEl();
  if (scrollElLocal) {
    scrollElLocal.addEventListener("scroll", onScroll);
    onScroll({ target: scrollElLocal });
  } else {
    onScroll({ target: { scrollTop: 0 } });
  }
};
const destroyScroll = () => {
  const scrollElLocal = getScrollEl();
  if (scrollElLocal) {
    scrollElLocal.removeEventListener("scroll", onScroll);
  }
};
$effect(() => {
  calcSize();
  if (!wasScrollable && isScrollable) {
    initScroll();
  } else if (wasScrollable && !isScrollable) {
    onScroll();
    wasScrollable = isScrollable;
    destroyScroll();
  } else if (wasScrollable && isScrollable) {
    onScroll();
  }
});
onMount(() => {
  calcSize();
  initScroll();
});
onDestroy(() => {
  destroyScroll();
});
</script>

<div class="{c.base}" bind:this="{elRef}" {...restProps}>
  <div class="{c.bg}" bind:this="{bgElRef}"></div>
  <div class="{c.inner}" bind:this="{innerElRef}">
    {#if leftSlot}
      <div class="{c.left}">{@render leftSlot()}</div>
    {/if}
    {#if titleSlot || subtitleSlot || title || subtitle}
      <div class="{c.title}" bind:this="{titleElRef}">
        {printText(title)}
        {@render titleSlot()}
        {#if subtitle || subtitleSlot}
          <div class="{c.subtitle}">
            {printText(subtitle)}{@render subtitleSlot()}
          </div>
        {/if}
      </div>
    {/if}
    {#if rightSlot}
      <div class="{c.right}">{@render rightSlot()}</div>
    {/if}
    {@render children()}
  </div>
  {#if large || medium}
    <div class="{c.titleContainer}" bind:this="{titleContainerElRef}">
      {printText(title)}
      {@render titleSlot()}
    </div>
  {/if}
  {#if subnavbarSlot}
    <div class="{c.subnavbar}" bind:this="{subnavbarElRef}">
      {@render subnavbarSlot()}
    </div>
  {/if}
</div>
