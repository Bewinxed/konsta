import { onMount, onDestroy } from 'svelte';
import { get } from 'svelte/store';
import { KonstaStore } from './KonstaStore.js';
import { TouchRipple } from '../../../shared/touch-ripple-class.js';
/**
 * A hook to manage touch ripple effects on elements.
 *
 * @param {Object | HTMLElement} el - The element to apply the touch ripple effect to.
 * @param {boolean} touchRipple - Whether the touch ripple effect should be applied.
 * @param {HTMLElement} [eventsEl] - The element to attach event listeners to. Defaults to `el` if not provided.
 */
export const useTouchRipple = (el, touchRipple, eventsEl) => {
    if (!eventsEl)
        eventsEl = el;
    /**
     * Determines if the touch ripple effect is needed based on current settings.
     *
     * @returns {boolean} Whether the touch ripple effect should be applied.
     */
    const needsTouchRipple = () => {
        return (touchRipple &&
            get(KonstaStore).theme === 'material' &&
            get(KonstaStore).touchRipple);
    };
    let ripple = null;
    /**
     * Removes the current ripple effect.
     */
    const removeRipple = () => {
        if (ripple)
            ripple.remove();
        ripple = null;
    };
    /**
     * Handles the pointerdown event to create a new ripple effect.
     *
     * @param {PointerEvent} e - The pointerdown event.
     */
    const onPointerDown = (e) => {
        ripple = new TouchRipple(el.current, e.pageX, e.pageY);
    };
    /**
     * Handles the pointermove event to remove the ripple effect.
     */
    const onPointerMove = () => {
        removeRipple();
    };
    /**
     * Handles the pointerup event to remove the ripple effect.
     */
    const onPointerUp = () => {
        removeRipple();
    };
    /**
     * Attaches event listeners for touch ripple effects.
     */
    const attachEvents = () => {
        if (!eventsEl ||
            !eventsEl.current ||
            !eventsEl.current.addEventListener ||
            !needsTouchRipple() ||
            eventsEl.__touchRippleAttached__)
            return;
        eventsEl.__touchRippleAttached__ = true;
        eventsEl.current.addEventListener('pointerdown', onPointerDown);
        eventsEl.current.addEventListener('pointermove', onPointerMove);
        eventsEl.current.addEventListener('pointerup', onPointerUp);
        eventsEl.current.addEventListener('pointercancel', onPointerUp);
        eventsEl.current.addEventListener('contextmenu', onPointerUp);
    };
    /**
     * Detaches event listeners for touch ripple effects.
     *
     * @param {boolean} deleteFlag - Whether to delete the __touchRippleAttached__ flag.
     */
    const detachEvents = (deleteFlag) => {
        if (!eventsEl || !eventsEl.current || !eventsEl.current.addEventListener)
            return;
        if (deleteFlag) {
            delete eventsEl.__touchRippleAttached__;
        }
        eventsEl.current.removeEventListener('pointerdown', onPointerDown);
        eventsEl.current.removeEventListener('pointermove', onPointerMove);
        eventsEl.current.removeEventListener('pointerup', onPointerUp);
        eventsEl.current.removeEventListener('pointercancel', onPointerUp);
        eventsEl.current.removeEventListener('contextmenu', onPointerUp);
    };
    onMount(() => {
        attachEvents();
    });
    $effect.pre(() => {
        if (!needsTouchRipple()) {
            detachEvents(true);
        }
    });
    onDestroy(() => {
        detachEvents(true);
    });
    KonstaStore.subscribe(() => {
        if (!needsTouchRipple()) {
            detachEvents();
        }
        else {
            detachEvents();
            attachEvents();
        }
    });
};
