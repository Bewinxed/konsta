const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["../nodes/0.Dcav0BKZ.js","../chunks/disclose-version.C8yWjxTa.js","../chunks/runtime.DOfOf6MH.js","../nodes/1.nEqI5fWJ.js","../chunks/render.BS5Zx4HV.js","../chunks/entry.CgDoXvOH.js","../nodes/2.BzUX7kiw.js"])))=>i.map(i=>d[i]);
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var _events, _instance;
import { w as is_frozen, S as STATE_FROZEN_SYMBOL, x as STATE_SYMBOL, y as object_prototype, z as array_prototype, d as define_property, A as source, i as is_array, s as set, B as get_descriptor, m as get, c as current_effect, k as untrack, C as get_prototype_of, D as block, E as resume_effect, b as branch, F as pause_effect, G as EFFECT_TRANSPARENT, H as effect, I as render_effect, J as queue_micro_task, K as props_invalid_value, L as LEGACY_DERIVED_PROP, M as safe_equals, N as derived, O as derived_safe_equal, q as mutable_source, P as flush_sync, g as current_component_context, j as user_effect, p as push, u as user_pre_effect, f as pop, Q as tick, v as template_effect } from "../chunks/runtime.DOfOf6MH.js";
import { h as hydrate, m as mount, u as unmount, s as set_text } from "../chunks/render.BS5Zx4HV.js";
import { U as UNINITIALIZED, h as hydrating, b as hydrate_next, u as HYDRATION_START_ELSE, v as remove_nodes, j as set_hydrate_node, i as set_hydrating, k as hydrate_node, P as PROPS_IS_UPDATED, w as PROPS_IS_IMMUTABLE, x as PROPS_IS_RUNES, y as PROPS_IS_LAZY_INITIAL, f as first_child, s as sibling, a as append, t as template, d as comment, c as child, z as text, r as reset } from "../chunks/disclose-version.C8yWjxTa.js";
function lifecycle_outside_component(name) {
  {
    throw new Error("lifecycle_outside_component");
  }
}
function proxy(value, parent = null, prev) {
  if (typeof value === "object" && value != null && !is_frozen(value) && !(STATE_FROZEN_SYMBOL in value)) {
    if (STATE_SYMBOL in value) {
      const metadata = (
        /** @type {ProxyMetadata<T>} */
        value[STATE_SYMBOL]
      );
      if (metadata.t === value || metadata.p === value) {
        return metadata.p;
      }
    }
    const prototype = get_prototype_of(value);
    if (prototype === object_prototype || prototype === array_prototype) {
      const proxy2 = new Proxy(value, state_proxy_handler);
      define_property(value, STATE_SYMBOL, {
        value: (
          /** @type {ProxyMetadata} */
          {
            s: /* @__PURE__ */ new Map(),
            v: source(0),
            a: is_array(value),
            p: proxy2,
            t: value
          }
        ),
        writable: true,
        enumerable: false
      });
      return proxy2;
    }
  }
  return value;
}
function update_version(signal, d = 1) {
  set(signal, signal.v + d);
}
const state_proxy_handler = {
  defineProperty(target, prop2, descriptor) {
    if (descriptor.value) {
      const metadata = target[STATE_SYMBOL];
      const s = metadata.s.get(prop2);
      if (s !== void 0) set(s, proxy(descriptor.value, metadata));
    }
    return Reflect.defineProperty(target, prop2, descriptor);
  },
  deleteProperty(target, prop2) {
    const metadata = target[STATE_SYMBOL];
    const s = metadata.s.get(prop2);
    const is_array2 = metadata.a;
    const boolean = delete target[prop2];
    if (is_array2 && boolean) {
      const ls = metadata.s.get("length");
      const length = target.length - 1;
      if (ls !== void 0 && ls.v !== length) {
        set(ls, length);
      }
    }
    if (s !== void 0) set(s, UNINITIALIZED);
    if (boolean) {
      update_version(metadata.v);
    }
    return boolean;
  },
  get(target, prop2, receiver) {
    var _a;
    if (prop2 === STATE_SYMBOL) {
      return Reflect.get(target, STATE_SYMBOL);
    }
    const metadata = target[STATE_SYMBOL];
    let s = metadata.s.get(prop2);
    if (s === void 0 && (!(prop2 in target) || ((_a = get_descriptor(target, prop2)) == null ? void 0 : _a.writable))) {
      s = source(proxy(target[prop2], metadata));
      metadata.s.set(prop2, s);
    }
    if (s !== void 0) {
      const value = get(s);
      return value === UNINITIALIZED ? void 0 : value;
    }
    return Reflect.get(target, prop2, receiver);
  },
  getOwnPropertyDescriptor(target, prop2) {
    const descriptor = Reflect.getOwnPropertyDescriptor(target, prop2);
    if (descriptor && "value" in descriptor) {
      const metadata = target[STATE_SYMBOL];
      const s = metadata.s.get(prop2);
      if (s) {
        descriptor.value = get(s);
      }
    }
    return descriptor;
  },
  has(target, prop2) {
    var _a;
    if (prop2 === STATE_SYMBOL) {
      return true;
    }
    const metadata = target[STATE_SYMBOL];
    const has = Reflect.has(target, prop2);
    let s = metadata.s.get(prop2);
    if (s !== void 0 || current_effect !== null && (!has || ((_a = get_descriptor(target, prop2)) == null ? void 0 : _a.writable))) {
      if (s === void 0) {
        s = source(has ? proxy(target[prop2], metadata) : UNINITIALIZED);
        metadata.s.set(prop2, s);
      }
      const value = get(s);
      if (value === UNINITIALIZED) {
        return false;
      }
    }
    return has;
  },
  set(target, prop2, value, receiver) {
    const metadata = target[STATE_SYMBOL];
    let s = metadata.s.get(prop2);
    if (s === void 0) {
      untrack(() => receiver[prop2]);
      s = metadata.s.get(prop2);
    }
    if (s !== void 0) {
      set(s, proxy(value, metadata));
    }
    const is_array2 = metadata.a;
    const not_has = !(prop2 in target);
    if (is_array2 && prop2 === "length") {
      for (let i = value; i < target.length; i += 1) {
        const s2 = metadata.s.get(i + "");
        if (s2 !== void 0) set(s2, UNINITIALIZED);
      }
    }
    var descriptor = Reflect.getOwnPropertyDescriptor(target, prop2);
    if (descriptor == null ? void 0 : descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      target[prop2] = value;
    }
    if (not_has) {
      if (is_array2) {
        const ls = metadata.s.get("length");
        const length = target.length;
        if (ls !== void 0 && ls.v !== length) {
          set(ls, length);
        }
      }
      update_version(metadata.v);
    }
    return true;
  },
  ownKeys(target) {
    const metadata = target[STATE_SYMBOL];
    get(metadata.v);
    return Reflect.ownKeys(target);
  }
};
function if_block(node, get_condition, consequent_fn, alternate_fn = null, elseif = false) {
  if (hydrating) {
    hydrate_next();
  }
  var anchor = node;
  var consequent_effect = null;
  var alternate_effect = null;
  var condition = null;
  var flags = elseif ? EFFECT_TRANSPARENT : 0;
  block(() => {
    if (condition === (condition = !!get_condition())) return;
    let mismatch = false;
    if (hydrating) {
      const is_else = (
        /** @type {Comment} */
        anchor.data === HYDRATION_START_ELSE
      );
      if (condition === is_else) {
        anchor = remove_nodes();
        set_hydrate_node(anchor);
        set_hydrating(false);
        mismatch = true;
      }
    }
    if (condition) {
      if (consequent_effect) {
        resume_effect(consequent_effect);
      } else {
        consequent_effect = branch(() => consequent_fn(anchor));
      }
      if (alternate_effect) {
        pause_effect(alternate_effect, () => {
          alternate_effect = null;
        });
      }
    } else {
      if (alternate_effect) {
        resume_effect(alternate_effect);
      } else if (alternate_fn) {
        alternate_effect = branch(() => alternate_fn(anchor));
      }
      if (consequent_effect) {
        pause_effect(consequent_effect, () => {
          consequent_effect = null;
        });
      }
    }
    if (mismatch) {
      set_hydrating(true);
    }
  }, flags);
  if (hydrating) {
    anchor = hydrate_node;
  }
}
function component(node, get_component, render_fn) {
  if (hydrating) {
    hydrate_next();
  }
  var anchor = node;
  var component2;
  var effect2;
  block(() => {
    if (component2 === (component2 = get_component())) return;
    if (effect2) {
      pause_effect(effect2);
      effect2 = null;
    }
    if (component2) {
      effect2 = branch(() => render_fn(anchor, component2));
    }
  });
  if (hydrating) {
    anchor = hydrate_node;
  }
}
function is_bound_this(bound_value, element_or_component) {
  var _a;
  var proxy_target = bound_value && ((_a = bound_value[STATE_SYMBOL]) == null ? void 0 : _a.t);
  return bound_value === element_or_component || proxy_target === element_or_component;
}
function bind_this(element_or_component = {}, update, get_value, get_parts) {
  effect(() => {
    var old_parts;
    var parts;
    render_effect(() => {
      old_parts = parts;
      parts = [];
      untrack(() => {
        if (element_or_component !== get_value(...parts)) {
          update(element_or_component, ...parts);
          if (old_parts && is_bound_this(get_value(...old_parts), element_or_component)) {
            update(null, ...old_parts);
          }
        }
      });
    });
    return () => {
      queue_micro_task(() => {
        if (parts && is_bound_this(get_value(...parts), element_or_component)) {
          update(null, ...parts);
        }
      });
    };
  });
  return element_or_component;
}
function prop(props, key, flags, fallback) {
  var _a;
  var immutable = (flags & PROPS_IS_IMMUTABLE) !== 0;
  var runes = (flags & PROPS_IS_RUNES) !== 0;
  var lazy = (flags & PROPS_IS_LAZY_INITIAL) !== 0;
  var prop_value = (
    /** @type {V} */
    props[key]
  );
  var setter = (_a = get_descriptor(props, key)) == null ? void 0 : _a.set;
  var fallback_value = (
    /** @type {V} */
    fallback
  );
  var fallback_dirty = true;
  var get_fallback = () => {
    if (lazy && fallback_dirty) {
      fallback_dirty = false;
      fallback_value = untrack(
        /** @type {() => V} */
        fallback
      );
    }
    return fallback_value;
  };
  if (prop_value === void 0 && fallback !== void 0) {
    if (setter && runes) {
      props_invalid_value();
    }
    prop_value = get_fallback();
    if (setter) setter(prop_value);
  }
  var getter;
  if (runes) {
    getter = () => {
      var value = (
        /** @type {V} */
        props[key]
      );
      if (value === void 0) return get_fallback();
      fallback_dirty = true;
      return value;
    };
  } else {
    var derived_getter = (immutable ? derived : derived_safe_equal)(
      () => (
        /** @type {V} */
        props[key]
      )
    );
    derived_getter.f |= LEGACY_DERIVED_PROP;
    getter = () => {
      var value = get(derived_getter);
      if (value !== void 0) fallback_value = /** @type {V} */
      void 0;
      return value === void 0 ? fallback_value : value;
    };
  }
  if ((flags & PROPS_IS_UPDATED) === 0) {
    return getter;
  }
  if (setter) {
    var legacy_parent = props.$$legacy;
    return function(value, mutation) {
      if (arguments.length > 0) {
        if (!runes || !mutation || legacy_parent) {
          setter(mutation ? getter() : value);
        }
        return value;
      } else {
        return getter();
      }
    };
  }
  var from_child = false;
  var inner_current_value = mutable_source(prop_value);
  var current_value = derived(() => {
    var parent_value = getter();
    var child_value = get(inner_current_value);
    if (from_child) {
      from_child = false;
      return child_value;
    }
    return inner_current_value.v = parent_value;
  });
  if (!immutable) current_value.equals = safe_equals;
  return function(value, mutation) {
    var current = get(current_value);
    if (arguments.length > 0) {
      const new_value = mutation ? get(current_value) : value;
      if (!current_value.equals(new_value)) {
        from_child = true;
        set(inner_current_value, new_value);
        get(current_value);
      }
      return value;
    }
    return current;
  };
}
function asClassComponent(component2) {
  return class extends Svelte4Component {
    /** @param {any} options */
    constructor(options) {
      super({
        component: component2,
        ...options
      });
    }
  };
}
class Svelte4Component {
  /**
   * @param {ComponentConstructorOptions & {
   *  component: any;
   * 	immutable?: boolean;
   * 	hydrate?: boolean;
   * 	recover?: false;
   * }} options
   */
  constructor(options) {
    /** @type {any} */
    __privateAdd(this, _events);
    /** @type {Record<string, any>} */
    __privateAdd(this, _instance);
    var sources = /* @__PURE__ */ new Map();
    var add_source = (key, value) => {
      var s = mutable_source(value);
      sources.set(key, s);
      return s;
    };
    const props = new Proxy(
      { ...options.props || {}, $$events: {} },
      {
        get(target, prop2) {
          return get(sources.get(prop2) ?? add_source(prop2, Reflect.get(target, prop2)));
        },
        has(target, prop2) {
          get(sources.get(prop2) ?? add_source(prop2, Reflect.get(target, prop2)));
          return Reflect.has(target, prop2);
        },
        set(target, prop2, value) {
          set(sources.get(prop2) ?? add_source(prop2, value), value);
          return Reflect.set(target, prop2, value);
        }
      }
    );
    __privateSet(this, _instance, (options.hydrate ? hydrate : mount)(options.component, {
      target: options.target,
      props,
      context: options.context,
      intro: options.intro ?? false,
      recover: options.recover
    }));
    flush_sync();
    __privateSet(this, _events, props.$$events);
    for (const key of Object.keys(__privateGet(this, _instance))) {
      if (key === "$set" || key === "$destroy" || key === "$on") continue;
      define_property(this, key, {
        get() {
          return __privateGet(this, _instance)[key];
        },
        /** @param {any} value */
        set(value) {
          __privateGet(this, _instance)[key] = value;
        },
        enumerable: true
      });
    }
    __privateGet(this, _instance).$set = /** @param {Record<string, any>} next */
    (next) => {
      Object.assign(props, next);
    };
    __privateGet(this, _instance).$destroy = () => {
      unmount(__privateGet(this, _instance));
    };
  }
  /** @param {Record<string, any>} props */
  $set(props) {
    __privateGet(this, _instance).$set(props);
  }
  /**
   * @param {string} event
   * @param {(...args: any[]) => any} callback
   * @returns {any}
   */
  $on(event, callback) {
    __privateGet(this, _events)[event] = __privateGet(this, _events)[event] || [];
    const cb = (...args) => callback.call(this, ...args);
    __privateGet(this, _events)[event].push(cb);
    return () => {
      __privateGet(this, _events)[event] = __privateGet(this, _events)[event].filter(
        /** @param {any} fn */
        (fn) => fn !== cb
      );
    };
  }
  $destroy() {
    __privateGet(this, _instance).$destroy();
  }
}
_events = new WeakMap();
_instance = new WeakMap();
function onMount(fn) {
  if (current_component_context === null) {
    lifecycle_outside_component();
  }
  if (current_component_context.l !== null) {
    init_update_callbacks(current_component_context).m.push(fn);
  } else {
    user_effect(() => {
      const cleanup = untrack(fn);
      if (typeof cleanup === "function") return (
        /** @type {() => void} */
        cleanup
      );
    });
  }
}
function init_update_callbacks(context) {
  var l = (
    /** @type {ComponentContextLegacy} */
    context.l
  );
  return l.u ?? (l.u = { a: [], b: [], m: [] });
}
const scriptRel = "modulepreload";
const assetsURL = function(dep, importerUrl) {
  return new URL(dep, importerUrl).href;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    const links = document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector(
      "meta[property=csp-nonce]"
    );
    const cspNonce = (cspNonceMeta == null ? void 0 : cspNonceMeta.nonce) || (cspNonceMeta == null ? void 0 : cspNonceMeta.getAttribute("nonce"));
    promise = Promise.all(
      deps.map((dep) => {
        dep = assetsURL(dep, importerUrl);
        if (dep in seen) return;
        seen[dep] = true;
        const isCss = dep.endsWith(".css");
        const cssSelector = isCss ? '[rel="stylesheet"]' : "";
        const isBaseRelative = !!importerUrl;
        if (isBaseRelative) {
          for (let i = links.length - 1; i >= 0; i--) {
            const link2 = links[i];
            if (link2.href === dep && (!isCss || link2.rel === "stylesheet")) {
              return;
            }
          }
        } else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
          return;
        }
        const link = document.createElement("link");
        link.rel = isCss ? "stylesheet" : scriptRel;
        if (!isCss) {
          link.as = "script";
          link.crossOrigin = "";
        }
        link.href = dep;
        if (cspNonce) {
          link.setAttribute("nonce", cspNonce);
        }
        document.head.appendChild(link);
        if (isCss) {
          return new Promise((res, rej) => {
            link.addEventListener("load", res);
            link.addEventListener(
              "error",
              () => rej(new Error(`Unable to preload CSS for ${dep}`))
            );
          });
        }
      })
    );
  }
  return promise.then(() => baseModule()).catch((err) => {
    const e = new Event("vite:preloadError", { cancelable: true });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  });
};
const matchers = {};
var root_4 = template(`<div id="svelte-announcer" aria-live="assertive" aria-atomic="true" style="position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px"><!></div>`);
var root$1 = template(`<!> <!>`, 1);
function Root($$anchor, $$props) {
  push($$props, true);
  let components = prop($$props, "components", 15, () => []), data_0 = prop($$props, "data_0", 3, null), data_1 = prop($$props, "data_1", 3, null);
  {
    user_pre_effect(() => $$props.stores.page.set($$props.page));
  }
  user_effect(() => {
    $$props.stores;
    $$props.page;
    $$props.constructors;
    components();
    $$props.form;
    data_0();
    data_1();
    $$props.stores.page.notify();
  });
  let mounted = source(false);
  let navigated = source(false);
  let title = source(null);
  onMount(() => {
    const unsubscribe = $$props.stores.page.subscribe(() => {
      if (get(mounted)) {
        set(navigated, true);
        tick().then(() => {
          set(title, proxy(document.title || "untitled page"));
        });
      }
    });
    set(mounted, true);
    return unsubscribe;
  });
  var fragment = root$1();
  var node = first_child(fragment);
  if_block(
    node,
    () => $$props.constructors[1],
    ($$anchor2) => {
      var fragment_1 = comment();
      var node_1 = first_child(fragment_1);
      component(node_1, () => $$props.constructors[0], ($$anchor3, $$component) => {
        bind_this(
          $$component($$anchor3, {
            get data() {
              return data_0();
            },
            children: ($$anchor4, $$slotProps) => {
              var fragment_2 = comment();
              var node_2 = first_child(fragment_2);
              component(node_2, () => $$props.constructors[1], ($$anchor5, $$component2) => {
                bind_this(
                  $$component2($$anchor5, {
                    get data() {
                      return data_1();
                    },
                    get form() {
                      return $$props.form;
                    }
                  }),
                  ($$value) => components()[1] = $$value,
                  () => {
                    var _a;
                    return (_a = components()) == null ? void 0 : _a[1];
                  }
                );
              });
              append($$anchor4, fragment_2);
            },
            $$slots: { default: true }
          }),
          ($$value) => components()[0] = $$value,
          () => {
            var _a;
            return (_a = components()) == null ? void 0 : _a[0];
          }
        );
      });
      append($$anchor2, fragment_1);
    },
    ($$anchor2) => {
      var fragment_3 = comment();
      var node_3 = first_child(fragment_3);
      component(node_3, () => $$props.constructors[0], ($$anchor3, $$component) => {
        bind_this(
          $$component($$anchor3, {
            get data() {
              return data_0();
            },
            get form() {
              return $$props.form;
            }
          }),
          ($$value) => components()[0] = $$value,
          () => {
            var _a;
            return (_a = components()) == null ? void 0 : _a[0];
          }
        );
      });
      append($$anchor2, fragment_3);
    }
  );
  var node_4 = sibling(sibling(node, true));
  if_block(node_4, () => get(mounted), ($$anchor2) => {
    var div = root_4();
    var node_5 = child(div);
    if_block(node_5, () => get(navigated), ($$anchor3) => {
      var text$1 = text();
      template_effect(() => set_text(text$1, get(title)));
      append($$anchor3, text$1);
    });
    reset(div);
    append($$anchor2, div);
  });
  append($$anchor, fragment);
  pop();
}
const root = asClassComponent(Root);
const nodes = [
  () => __vitePreload(() => import("../nodes/0.Dcav0BKZ.js"), true ? __vite__mapDeps([0,1,2]) : void 0, import.meta.url),
  () => __vitePreload(() => import("../nodes/1.nEqI5fWJ.js"), true ? __vite__mapDeps([3,1,2,4,5]) : void 0, import.meta.url),
  () => __vitePreload(() => import("../nodes/2.BzUX7kiw.js"), true ? __vite__mapDeps([6,1,2]) : void 0, import.meta.url)
];
const server_loads = [];
const dictionary = {
  "/": [2]
};
const hooks = {
  handleError: ({ error }) => {
    console.error(error);
  },
  reroute: () => {
  }
};
export {
  dictionary,
  hooks,
  matchers,
  nodes,
  root,
  server_loads
};
//# sourceMappingURL=app.x0MIonw4.js.map
