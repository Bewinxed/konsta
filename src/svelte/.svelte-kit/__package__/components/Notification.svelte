<script lang="ts">import { NotificationsClasses } from "../../../shared/classes/NotificationsClasses.js";
import { NotificationsColors } from "../../../shared/colors/NotificationsColors.js";
import { useThemeClasses } from "../shared/use-theme-classes.js";
import { useDarkClasses } from "../shared/use-dark-classes.js";
import { printText } from "../shared/print-text.js";
import { useTheme } from "../shared/use-theme.js";
import DeleteIcon from "./icons/DeleteIcon.svelte";
let {
  class: className,
  colors: colorsProp,
  ios,
  material,
  translucent = true,
  onClick,
  onClose,
  button,
  title = "",
  titleRightText = "",
  subtitle = "",
  text = "",
  opened = false,
  children,
  // slots
  iconSlot,
  titleSlot,
  titleRightTextSlot,
  subtitleSlot,
  textSlot,
  buttonSlot,
  ...restProps
} = $props();
const dark = useDarkClasses();
let theme;
theme = useTheme({}, (v) => theme = v);
let colors = $derived(NotificationsColors(colorsProp, dark));
let c = $state(
  useThemeClasses(
    { ios, material },
    NotificationsClasses({ opened, translucent }, colors, className),
    (v) => c = v,
    className
  )
);
</script>

{#if theme === 'ios'}
  <div class="{c.base}" {...restProps} onclick="{onClick}">
    <div class="{c.header}">
      {#if iconSlot}
        <div class="{c.icon}">{@render iconSlot()}</div>
      {/if}
      {#if title || titleSlot}
        <div class="{c.title}">{printText(title)}{@render titleSlot()}</div>
      {/if}
      {#if titleRightText || titleRightTextSlot}
        <div class="{c.titleRightText}">
          {printText(titleRightText)}{@render titleRightTextSlot()}
        </div>
      {/if}
      {#if button || buttonSlot}
        <div class="{c.button}" role="button" tabindex="0" onclick="{onClose}">
          <DeleteIcon {theme} class="{c.deleteIcon}" />
          {@render buttonSlot()}
        </div>
      {/if}
    </div>
    <div class="{c.content}">
      {#if subtitle || subtitleSlot}
        <div class="{c.subtitle}">
          {printText(subtitle)}{@render subtitleSlot()}
        </div>
      {/if}
      {#if text || textSlot}
        <div class="{c.text}">{printText(text)}{@render textSlot()}</div>
      {/if}
      {@render children()}
    </div>
  </div>
{:else}
  <div class="{c.base}" {...restProps} onclick="{onClick}">
    <div class="{c.header}">
      {#if iconSlot}
        <div class="{c.icon}">{@render iconSlot()}</div>
      {/if}
      <div class="{c.contentWrapper}">
        <div class="{c.contentTitle}">
          {#if title || titleSlot}
            <div class="{c.title}">{printText(title)}{@render titleSlot()}</div>
          {/if}
          {#if titleRightText || titleRightTextSlot}
            <div class="{c.titleRightText}">
              {printText(titleRightText)}{@render titleRightTextSlot()}
            </div>
          {/if}
        </div>
        <div class="{c.content}">
          {#if subtitle || subtitleSlot}
            <div class="{c.subtitle}">
              {printText(subtitle)}{@render subtitleSlot()}
            </div>
          {/if}
          {#if text || textSlot}
            <div class="{c.text}">{printText(text)}{@render textSlot()}</div>
          {/if}
          {@render children()}
        </div>
      </div>
      {#if button || buttonSlot}
        <div class="{c.button}" role="button" tabindex="0" onclick="{onClose}">
          <DeleteIcon {theme} class="{c.deleteIcon}" />
          {@render buttonSlot()}
        </div>
      {/if}
    </div>
  </div>
{/if}
