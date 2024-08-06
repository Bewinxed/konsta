<script lang="ts">
  import { Snippet } from 'svelte';
  import { AppClasses } from '../../shared/classes/AppClasses.js';
  import KonstaProvider from '../shared/KonstaProvider.svelte';
  import { KonstaStore } from '../shared/KonstaStore.js';

  let {
    class: className,
    theme = 'material',
    dark = true,
    touchRipple = true,
    safeAreas = true,
    children,
    ...restProps
  }: {
    class?: string;
    theme?: 'ios' | 'material' | 'parent';
    dark?: boolean;
    touchRipple?: boolean;
    safeAreas?: boolean;
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

  let classes = $derived(
    AppClasses({ theme, dark, touchRipple, safeAreas }, currentTheme, className)
  );
</script>

<KonstaProvider
  theme="{currentTheme}"
  {dark}
  {touchRipple}
  autoThemeDetection="{false}"
>
  <div class="{classes}" {...restProps}>
    {@render children()}
  </div>
</KonstaProvider>
