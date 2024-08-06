<script lang="ts">
  import { Component, Snippet } from 'svelte';

  import { MessageClasses } from '../../shared/classes/MessageClasses.js';
  import { MessageColors } from '../../shared/colors/MessageColors.js';
  import { useThemeClasses } from '../shared/use-theme-classes.js';
  import { useDarkClasses } from '../shared/use-dark-classes.js';
  import { printText } from '../shared/print-text.js';
  import { cls } from '../../shared/cls.js';

  let {
    class: className,
    colors: colorsProp,
    ios,
    material,
    component = 'div',
    id,
    text = '',
    name,
    type = 'sent',
    header = '',
    footer = '',
    textHeader = '',
    textFooter = '',
    avatar,
    onClick,
    children,
    avatarSlot,
    nameSlot,
    headerSlot,
    textHeaderSlot,
    textFooterSlot,
    textSlot,
    footerSlot,
    ...restProps
  }: {
    class?: string;
    colors?: string;
    ios?: boolean;
    material?: boolean;
    component?: string;
    id?: string;
    text?: string;
    name?: string;
    type?: string;
    header?: string;
    footer?: string;
    textHeader?: string;
    textFooter?: string;
    avatar?: string;
    onClick?: (e: any) => void;
    children?: Snippet;
    avatarSlot?: Snippet;
    nameSlot?: Snippet;
    headerSlot?: Snippet;
    textHeaderSlot?: Snippet;
    textFooterSlot?: Snippet;
    textSlot?: Snippet;
    footerSlot?: Snippet;
  } = $props();

  let rippleEl = $state({ current: null });

  const dark = useDarkClasses();

  let colors = $derived(MessageColors(colorsProp, dark));

  let c = $derived(
    useThemeClasses(
      { ios, material },
      MessageClasses({ type }, colors),
      (v) => (c = v),
      className
    )
  );

  let classes = $derived(
    cls(
      c.message,
      type === 'sent' && c.messageSent,
      type === 'received' && c.messageReceived,
      className
    )
  );
</script>

<svelte:element
  this="{component}"
  {id}
  bind:this="{rippleEl.current}"
  class="{classes}"
  onclick="{onClick}"
  {...restProps}
>
  {#if avatar || avatarSlot}
    <div class="{c.messageAvatar}">
      {printText(avatar)}{@render avatarSlot()}
    </div>
  {/if}
  <div class="{c.messageContent}">
    {#if name || nameSlot}
      <div class="{c.messageName}">{printText(name)}{@render nameSlot()}</div>
    {/if}
    {#if header || headerSlot}
      <div class="{c.messageHeader}">
        {printText(header)}{@render headerSlot()}
      </div>
    {/if}
    <div class="{c.messageBubble}">
      {#if textHeader || textHeaderSlot}
        <div class="{c.messageTextHeader}">
          {printText(textHeader)}{@render textHeaderSlot()}
        </div>
      {/if}
      {#if text || textSlot}
        <div class="{c.messageText}">{printText(text)}{@render textSlot()}</div>
      {/if}
      {#if textFooter || textFooterSlot}
        <div class="{c.messageTextFooter}">
          {printText(textFooter)}{@render textFooterSlot()}
        </div>
      {/if}
    </div>
    {#if footer || footerSlot}
      <div class="{c.messageFooter}">
        {printText(footer)}{@render footerSlot()}
      </div>
    {/if}
  </div>
</svelte:element>
