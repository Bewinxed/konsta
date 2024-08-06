// eslint-disable-next-line
import { getContext, onDestroy } from 'svelte';

// generic

/** @template T */
/**
 *
 * @param {string} name
 * @param {(value: T) => void} setValue
 * @returns {T}
 */
export const getReactiveContext = (name, setValue) => {
  const ctx = getContext(name);
  if (!ctx) return undefined;
  const { value, subscribe, unsubscribe } = ctx;
  subscribe(setValue);
  onDestroy(() => {
    unsubscribe(setValue);
  });
  return value;
};
