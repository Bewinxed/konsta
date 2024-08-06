<script lang="ts">
  import { Snippet } from 'svelte';
  import { KonstaStore } from './KonstaStore.js';

  let {
    theme,
    dark = false,
    touchRipple = true,
    autoThemeDetection = true,
    children,
    ...restProps
  }: {
    theme?: 'ios' | 'material' | 'parent';
    dark?: boolean;
    touchRipple?: boolean;
    autoThemeDetection?: boolean;
    children: Snippet;
  } = $props();

  let currentTheme = theme;

  const updateStore = () => {
    KonstaStore.set({
      theme: currentTheme,
      dark,
      touchRipple,
    });
  };

  const calcTheme = () => {
    if (!autoThemeDetection) return;
    if (theme === 'ios' || theme === 'material') {
      if (currentTheme !== theme) {
        currentTheme = theme;
        updateStore();
      }
    } else if (
      currentTheme === 'parent' &&
      typeof window !== 'undefined' &&
      typeof document !== 'undefined'
    ) {
      const htmlEl = document.documentElement;
      if (htmlEl) {
        if (htmlEl.classList.contains('ios')) {
          currentTheme = 'ios';
          updateStore();
        } else if (
          htmlEl.classList.contains('md') ||
          htmlEl.classList.contains('material')
        ) {
          currentTheme = 'material';
          updateStore();
        }
      }
    }
  };

  $effect(() => {
    calcTheme();
  });

  calcTheme();

  updateStore();
</script>

{@render children()}
