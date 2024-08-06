<script lang="ts">
  import { ActionsGroupClasses } from '../../shared/classes/ActionsGroupClasses.js';
  import { useThemeClasses } from '../shared/use-theme-classes.js';

  let {
    class: className,
    ios,
    material,
    dividers,
    ...restProps
  }: {
    class?: string;
    ios?: boolean;
    material?: boolean;
    dividers?: boolean;
  } = $props()

  let c = $derived(useThemeClasses(
    { ios, material },
    ActionsGroupClasses({ dividers }),
    (v) => (c = v),
    className,
  ))
</script>

<div class={c.base} {...$$restProps}>
  <slot />
</div>
