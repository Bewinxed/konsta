import { writable, type Writable } from 'svelte/store';

const KonstaStore = writable({
  theme: 'material',
  dark: true,
  touchRipple: true,
}) as Writable<{
  theme: 'ios' | 'material';
  dark: boolean;
  touchRipple: boolean;
}>;

export { KonstaStore };
