import { f as first_child, c as child, s as sibling, a as append, t as template, r as reset } from "../chunks/disclose-version.C8yWjxTa.js";
import { u as user_pre_effect, j as user_effect, g as current_component_context, r as run_all, k as untrack, l as run, m as get, n as deep_read_state, o as noop, t as teardown, q as mutable_source, s as set, p as push, v as template_effect, f as pop } from "../chunks/runtime.DOfOf6MH.js";
import { s as set_text } from "../chunks/render.BS5Zx4HV.js";
import { s as stores } from "../chunks/entry.CgDoXvOH.js";
function init() {
  const context = (
    /** @type {ComponentContextLegacy} */
    current_component_context
  );
  const callbacks = context.l.u;
  if (!callbacks) return;
  if (callbacks.b.length) {
    user_pre_effect(() => {
      observe_all(context);
      run_all(callbacks.b);
    });
  }
  user_effect(() => {
    const fns = untrack(() => callbacks.m.map(run));
    return () => {
      for (const fn of fns) {
        if (typeof fn === "function") {
          fn();
        }
      }
    };
  });
  if (callbacks.a.length) {
    user_effect(() => {
      observe_all(context);
      run_all(callbacks.a);
    });
  }
}
function observe_all(context) {
  if (context.l.s) {
    for (const signal of context.l.s) get(signal);
  }
  deep_read_state(context.s);
}
function subscribe_to_store(store, run2, invalidate) {
  if (store == null) {
    run2(void 0);
    return noop;
  }
  const unsub = store.subscribe(
    run2,
    // @ts-expect-error
    invalidate
  );
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function store_get(store, store_name, stores2) {
  const entry = stores2[store_name] ?? (stores2[store_name] = {
    store: null,
    source: mutable_source(void 0),
    unsubscribe: noop
  });
  if (entry.store !== store) {
    entry.unsubscribe();
    entry.store = store ?? null;
    if (store == null) {
      entry.source.v = void 0;
      entry.unsubscribe = noop;
    } else {
      var is_synchronous_callback = true;
      entry.unsubscribe = subscribe_to_store(store, (v) => {
        if (is_synchronous_callback) {
          entry.source.v = v;
        } else {
          set(entry.source, v);
        }
      });
      is_synchronous_callback = false;
    }
  }
  return get(entry.source);
}
function setup_stores() {
  const stores2 = {};
  teardown(() => {
    for (var store_name in stores2) {
      const ref = stores2[store_name];
      ref.unsubscribe();
    }
  });
  return stores2;
}
const getStores = () => {
  const stores$1 = stores;
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores$1.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores$1.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores$1.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
var root = template(`<h1> </h1> <p> </p>`, 1);
function Error$1($$anchor, $$props) {
  push($$props, false);
  const $$stores = setup_stores();
  const $page = () => store_get(page, "$page", $$stores);
  init();
  var fragment = root();
  var h1 = first_child(fragment);
  var text = child(h1);
  reset(h1);
  var p = sibling(sibling(h1, true));
  var text_1 = child(p);
  reset(p);
  template_effect(() => {
    var _a;
    set_text(text, $page().status);
    set_text(text_1, (_a = $page().error) == null ? void 0 : _a.message);
  });
  append($$anchor, fragment);
  pop();
}
export {
  Error$1 as component
};
//# sourceMappingURL=1.nEqI5fWJ.js.map
