var is_array = Array.isArray;
var array_from = Array.from;
var is_frozen = Object.isFrozen;
var define_property = Object.defineProperty;
var get_descriptor = Object.getOwnPropertyDescriptor;
var get_descriptors = Object.getOwnPropertyDescriptors;
var object_prototype = Object.prototype;
var array_prototype = Array.prototype;
var get_prototype_of = Object.getPrototypeOf;
const noop = () => {
};
function run(fn) {
  return fn();
}
function run_all(arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i]();
  }
}
const DERIVED = 1 << 1;
const EFFECT = 1 << 2;
const RENDER_EFFECT = 1 << 3;
const BLOCK_EFFECT = 1 << 4;
const BRANCH_EFFECT = 1 << 5;
const ROOT_EFFECT = 1 << 6;
const UNOWNED = 1 << 7;
const DISCONNECTED = 1 << 8;
const CLEAN = 1 << 9;
const DIRTY = 1 << 10;
const MAYBE_DIRTY = 1 << 11;
const INERT = 1 << 12;
const DESTROYED = 1 << 13;
const EFFECT_RAN = 1 << 14;
const EFFECT_TRANSPARENT = 1 << 15;
const LEGACY_DERIVED_PROP = 1 << 16;
const HEAD_EFFECT = 1 << 18;
const STATE_SYMBOL = Symbol("$state");
const STATE_FROZEN_SYMBOL = Symbol("$state.frozen");
function equals(value) {
  return value === this.v;
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a !== null && typeof a === "object" || typeof a === "function";
}
function safe_equals(value) {
  return !safe_not_equal(value, this.v);
}
function effect_in_teardown(rune) {
  {
    throw new Error("effect_in_teardown");
  }
}
function effect_in_unowned_derived() {
  {
    throw new Error("effect_in_unowned_derived");
  }
}
function effect_orphan(rune) {
  {
    throw new Error("effect_orphan");
  }
}
function effect_update_depth_exceeded() {
  {
    throw new Error("effect_update_depth_exceeded");
  }
}
function hydration_failed() {
  {
    throw new Error("hydration_failed");
  }
}
function props_invalid_value(key) {
  {
    throw new Error("props_invalid_value");
  }
}
function state_unsafe_mutation() {
  {
    throw new Error("state_unsafe_mutation");
  }
}
// @__NO_SIDE_EFFECTS__
function source(v) {
  return {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v,
    reactions: null,
    equals,
    version: 0
  };
}
// @__NO_SIDE_EFFECTS__
function mutable_source(initial_value) {
  var _a;
  const s = /* @__PURE__ */ source(initial_value);
  s.equals = safe_equals;
  if (current_component_context !== null && current_component_context.l !== null) {
    ((_a = current_component_context.l).s ?? (_a.s = [])).push(s);
  }
  return s;
}
function set(source2, value) {
  if (current_reaction !== null && is_runes() && (current_reaction.f & DERIVED) !== 0) {
    state_unsafe_mutation();
  }
  if (!source2.equals(value)) {
    source2.v = value;
    source2.version = increment_version();
    mark_reactions(source2, DIRTY);
    if (is_runes() && current_effect !== null && (current_effect.f & CLEAN) !== 0 && (current_effect.f & BRANCH_EFFECT) === 0) {
      if (new_deps !== null && new_deps.includes(source2)) {
        set_signal_status(current_effect, DIRTY);
        schedule_effect(current_effect);
      } else {
        if (current_untracked_writes === null) {
          set_current_untracked_writes([source2]);
        } else {
          current_untracked_writes.push(source2);
        }
      }
    }
  }
  return value;
}
function mark_reactions(signal, status) {
  var reactions = signal.reactions;
  if (reactions === null) return;
  var runes = is_runes();
  var length = reactions.length;
  for (var i = 0; i < length; i++) {
    var reaction = reactions[i];
    var flags = reaction.f;
    if ((flags & DIRTY) !== 0) continue;
    if (!runes && reaction === current_effect) continue;
    set_signal_status(reaction, status);
    if ((flags & (CLEAN | UNOWNED)) !== 0) {
      if ((flags & DERIVED) !== 0) {
        mark_reactions(
          /** @type {Derived} */
          reaction,
          MAYBE_DIRTY
        );
      } else {
        schedule_effect(
          /** @type {Effect} */
          reaction
        );
      }
    }
  }
}
function validate_effect(rune) {
  if (current_effect === null && current_reaction === null) {
    effect_orphan();
  }
  if (current_reaction !== null && (current_reaction.f & UNOWNED) !== 0) {
    effect_in_unowned_derived();
  }
  if (is_destroying_effect) {
    effect_in_teardown();
  }
}
function push_effect(effect2, parent_effect) {
  var parent_last = parent_effect.last;
  if (parent_last === null) {
    parent_effect.last = parent_effect.first = effect2;
  } else {
    parent_last.next = effect2;
    effect2.prev = parent_last;
    parent_effect.last = effect2;
  }
}
function create_effect(type, fn, sync, push2 = true) {
  var is_root = (type & ROOT_EFFECT) !== 0;
  var effect2 = {
    ctx: current_component_context,
    deps: null,
    nodes: null,
    f: type | DIRTY,
    first: null,
    fn,
    last: null,
    next: null,
    parent: is_root ? null : current_effect,
    prev: null,
    teardown: null,
    transitions: null,
    version: 0
  };
  if (sync) {
    var previously_flushing_effect = is_flushing_effect;
    try {
      set_is_flushing_effect(true);
      update_effect(effect2);
      effect2.f |= EFFECT_RAN;
    } catch (e) {
      destroy_effect(effect2);
      throw e;
    } finally {
      set_is_flushing_effect(previously_flushing_effect);
    }
  } else if (fn !== null) {
    schedule_effect(effect2);
  }
  var inert = sync && effect2.deps === null && effect2.first === null && effect2.nodes === null && effect2.teardown === null;
  if (!inert && !is_root && push2) {
    if (current_effect !== null) {
      push_effect(effect2, current_effect);
    }
    if (current_reaction !== null && (current_reaction.f & DERIVED) !== 0) {
      push_effect(effect2, current_reaction);
    }
  }
  return effect2;
}
function teardown(fn) {
  const effect2 = create_effect(RENDER_EFFECT, null, false);
  set_signal_status(effect2, CLEAN);
  effect2.teardown = fn;
  return effect2;
}
function user_effect(fn) {
  validate_effect();
  var defer = current_effect !== null && (current_effect.f & RENDER_EFFECT) !== 0 && // TODO do we actually need this? removing them changes nothing
  current_component_context !== null && !current_component_context.m;
  if (defer) {
    var context = (
      /** @type {ComponentContext} */
      current_component_context
    );
    (context.e ?? (context.e = [])).push(fn);
  } else {
    var signal = effect(fn);
    return signal;
  }
}
function user_pre_effect(fn) {
  validate_effect();
  return render_effect(fn);
}
function effect_root(fn) {
  const effect2 = create_effect(ROOT_EFFECT, fn, true);
  return () => {
    destroy_effect(effect2);
  };
}
function effect(fn) {
  return create_effect(EFFECT, fn, false);
}
function render_effect(fn) {
  return create_effect(RENDER_EFFECT, fn, true);
}
function template_effect(fn) {
  return render_effect(fn);
}
function block(fn, flags = 0) {
  return create_effect(RENDER_EFFECT | BLOCK_EFFECT | flags, fn, true);
}
function branch(fn, push2 = true) {
  return create_effect(RENDER_EFFECT | BRANCH_EFFECT, fn, true, push2);
}
function execute_effect_teardown(effect2) {
  var teardown2 = effect2.teardown;
  if (teardown2 !== null) {
    const previously_destroying_effect = is_destroying_effect;
    const previous_reaction = current_reaction;
    set_is_destroying_effect(true);
    set_current_reaction(null);
    try {
      teardown2.call(null);
    } finally {
      set_is_destroying_effect(previously_destroying_effect);
      set_current_reaction(previous_reaction);
    }
  }
}
function destroy_effect(effect2, remove_dom = true) {
  var removed = false;
  if ((remove_dom || (effect2.f & HEAD_EFFECT) !== 0) && effect2.nodes !== null) {
    var node = effect2.nodes.start;
    var end = effect2.nodes.end;
    while (node !== null) {
      var next = node === end ? null : (
        /** @type {TemplateNode} */
        node.nextSibling
      );
      node.remove();
      node = next;
    }
    removed = true;
  }
  destroy_effect_children(effect2, remove_dom && !removed);
  remove_reactions(effect2, 0);
  set_signal_status(effect2, DESTROYED);
  if (effect2.transitions) {
    for (const transition of effect2.transitions) {
      transition.stop();
    }
  }
  execute_effect_teardown(effect2);
  var parent = effect2.parent;
  if (parent !== null && (effect2.f & BRANCH_EFFECT) !== 0 && parent.first !== null) {
    unlink_effect(effect2);
  }
  effect2.next = effect2.prev = effect2.teardown = effect2.ctx = effect2.deps = effect2.parent = effect2.fn = effect2.nodes = null;
}
function unlink_effect(effect2) {
  var parent = effect2.parent;
  var prev = effect2.prev;
  var next = effect2.next;
  if (prev !== null) prev.next = next;
  if (next !== null) next.prev = prev;
  if (parent !== null) {
    if (parent.first === effect2) parent.first = next;
    if (parent.last === effect2) parent.last = prev;
  }
}
function pause_effect(effect2, callback) {
  var transitions = [];
  pause_children(effect2, transitions, true);
  run_out_transitions(transitions, () => {
    destroy_effect(effect2);
    if (callback) callback();
  });
}
function run_out_transitions(transitions, fn) {
  var remaining = transitions.length;
  if (remaining > 0) {
    var check = () => --remaining || fn();
    for (var transition of transitions) {
      transition.out(check);
    }
  } else {
    fn();
  }
}
function pause_children(effect2, transitions, local) {
  if ((effect2.f & INERT) !== 0) return;
  effect2.f ^= INERT;
  if (effect2.transitions !== null) {
    for (const transition of effect2.transitions) {
      if (transition.is_global || local) {
        transitions.push(transition);
      }
    }
  }
  var child = effect2.first;
  while (child !== null) {
    var sibling = child.next;
    var transparent = (child.f & EFFECT_TRANSPARENT) !== 0 || (child.f & BRANCH_EFFECT) !== 0;
    pause_children(child, transitions, transparent ? local : false);
    child = sibling;
  }
}
function resume_effect(effect2) {
  resume_children(effect2, true);
}
function resume_children(effect2, local) {
  if ((effect2.f & INERT) === 0) return;
  effect2.f ^= INERT;
  if (check_dirtiness(effect2)) {
    update_effect(effect2);
  }
  var child = effect2.first;
  while (child !== null) {
    var sibling = child.next;
    var transparent = (child.f & EFFECT_TRANSPARENT) !== 0 || (child.f & BRANCH_EFFECT) !== 0;
    resume_children(child, transparent ? local : false);
    child = sibling;
  }
  if (effect2.transitions !== null) {
    for (const transition of effect2.transitions) {
      if (transition.is_global || local) {
        transition.in();
      }
    }
  }
}
let is_micro_task_queued$1 = false;
let current_queued_micro_tasks = [];
function process_micro_tasks() {
  is_micro_task_queued$1 = false;
  const tasks = current_queued_micro_tasks.slice();
  current_queued_micro_tasks = [];
  run_all(tasks);
}
function queue_micro_task(fn) {
  if (!is_micro_task_queued$1) {
    is_micro_task_queued$1 = true;
    queueMicrotask(process_micro_tasks);
  }
  current_queued_micro_tasks.push(fn);
}
function flush_tasks() {
  if (is_micro_task_queued$1) {
    process_micro_tasks();
  }
}
// @__NO_SIDE_EFFECTS__
function derived(fn) {
  let flags = DERIVED | DIRTY;
  if (current_effect === null) flags |= UNOWNED;
  const signal = {
    deps: null,
    deriveds: null,
    equals,
    f: flags,
    first: null,
    fn,
    last: null,
    reactions: null,
    v: (
      /** @type {V} */
      null
    ),
    version: 0
  };
  if (current_reaction !== null && (current_reaction.f & DERIVED) !== 0) {
    var current_derived = (
      /** @type {Derived} */
      current_reaction
    );
    if (current_derived.deriveds === null) {
      current_derived.deriveds = [signal];
    } else {
      current_derived.deriveds.push(signal);
    }
  }
  return signal;
}
// @__NO_SIDE_EFFECTS__
function derived_safe_equal(fn) {
  const signal = /* @__PURE__ */ derived(fn);
  signal.equals = safe_equals;
  return signal;
}
function destroy_derived_children(derived2) {
  destroy_effect_children(derived2);
  var deriveds = derived2.deriveds;
  if (deriveds !== null) {
    derived2.deriveds = null;
    for (var i = 0; i < deriveds.length; i += 1) {
      destroy_derived(deriveds[i]);
    }
  }
}
function update_derived(derived2) {
  destroy_derived_children(derived2);
  var value = update_reaction(derived2);
  var status = (current_skip_reaction || (derived2.f & UNOWNED) !== 0) && derived2.deps !== null ? MAYBE_DIRTY : CLEAN;
  set_signal_status(derived2, status);
  if (!derived2.equals(value)) {
    derived2.v = value;
    derived2.version = increment_version();
  }
}
function destroy_derived(signal) {
  destroy_derived_children(signal);
  remove_reactions(signal, 0);
  set_signal_status(signal, DESTROYED);
  signal.first = signal.last = signal.deps = signal.reactions = // @ts-expect-error `signal.fn` cannot be `null` while the signal is alive
  signal.fn = null;
}
const FLUSH_MICROTASK = 0;
const FLUSH_SYNC = 1;
let current_scheduler_mode = FLUSH_MICROTASK;
let is_micro_task_queued = false;
let is_flushing_effect = false;
let is_destroying_effect = false;
function set_is_flushing_effect(value) {
  is_flushing_effect = value;
}
function set_is_destroying_effect(value) {
  is_destroying_effect = value;
}
let current_queued_root_effects = [];
let flush_count = 0;
let current_reaction = null;
function set_current_reaction(reaction) {
  current_reaction = reaction;
}
let current_effect = null;
let new_deps = null;
let skipped_deps = 0;
let current_untracked_writes = null;
function set_current_untracked_writes(value) {
  current_untracked_writes = value;
}
let current_version = 0;
let current_skip_reaction = false;
let current_component_context = null;
function increment_version() {
  return current_version++;
}
function is_runes() {
  return current_component_context !== null && current_component_context.l === null;
}
function check_dirtiness(reaction) {
  var _a, _b;
  var flags = reaction.f;
  if ((flags & DIRTY) !== 0) {
    return true;
  }
  if ((flags & MAYBE_DIRTY) !== 0) {
    var dependencies = reaction.deps;
    if (dependencies !== null) {
      var is_unowned = (flags & UNOWNED) !== 0;
      var i;
      if ((flags & DISCONNECTED) !== 0) {
        for (i = 0; i < dependencies.length; i++) {
          ((_a = dependencies[i]).reactions ?? (_a.reactions = [])).push(reaction);
        }
        reaction.f ^= DISCONNECTED;
      }
      for (i = 0; i < dependencies.length; i++) {
        var dependency = dependencies[i];
        if (check_dirtiness(
          /** @type {Derived} */
          dependency
        )) {
          update_derived(
            /** @type {Derived} */
            dependency
          );
        }
        if (dependency.version > reaction.version) {
          return true;
        }
        if (is_unowned) {
          if (!current_skip_reaction && !((_b = dependency == null ? void 0 : dependency.reactions) == null ? void 0 : _b.includes(reaction))) {
            (dependency.reactions ?? (dependency.reactions = [])).push(reaction);
          }
        }
      }
    }
    set_signal_status(reaction, CLEAN);
  }
  return false;
}
function handle_error(error, effect2, component_context) {
  {
    throw error;
  }
}
function update_reaction(reaction) {
  var previous_deps = new_deps;
  var previous_skipped_deps = skipped_deps;
  var previous_untracked_writes = current_untracked_writes;
  var previous_reaction = current_reaction;
  var previous_skip_reaction = current_skip_reaction;
  new_deps = /** @type {null | Value[]} */
  null;
  skipped_deps = 0;
  current_untracked_writes = null;
  current_reaction = (reaction.f & (BRANCH_EFFECT | ROOT_EFFECT)) === 0 ? reaction : null;
  current_skip_reaction = !is_flushing_effect && (reaction.f & UNOWNED) !== 0;
  try {
    var result = (
      /** @type {Function} */
      (0, reaction.fn)()
    );
    var deps = reaction.deps;
    if (new_deps !== null) {
      var dependency;
      var i;
      if (deps !== null) {
        var array = skipped_deps === 0 ? new_deps : deps.slice(0, skipped_deps).concat(new_deps);
        var set2 = array.length > 16 ? new Set(array) : null;
        for (i = skipped_deps; i < deps.length; i++) {
          dependency = deps[i];
          if (set2 !== null ? !set2.has(dependency) : !array.includes(dependency)) {
            remove_reaction(reaction, dependency);
          }
        }
      }
      if (deps !== null && skipped_deps > 0) {
        deps.length = skipped_deps + new_deps.length;
        for (i = 0; i < new_deps.length; i++) {
          deps[skipped_deps + i] = new_deps[i];
        }
      } else {
        reaction.deps = deps = new_deps;
      }
      if (!current_skip_reaction) {
        for (i = skipped_deps; i < deps.length; i++) {
          dependency = deps[i];
          var reactions = dependency.reactions;
          if (reactions === null) {
            dependency.reactions = [reaction];
          } else if (reactions[reactions.length - 1] !== reaction && !reactions.includes(reaction)) {
            reactions.push(reaction);
          }
        }
      }
    } else if (deps !== null && skipped_deps < deps.length) {
      remove_reactions(reaction, skipped_deps);
      deps.length = skipped_deps;
    }
    return result;
  } finally {
    new_deps = previous_deps;
    skipped_deps = previous_skipped_deps;
    current_untracked_writes = previous_untracked_writes;
    current_reaction = previous_reaction;
    current_skip_reaction = previous_skip_reaction;
  }
}
function remove_reaction(signal, dependency) {
  const reactions = dependency.reactions;
  let reactions_length = 0;
  if (reactions !== null) {
    reactions_length = reactions.length - 1;
    const index = reactions.indexOf(signal);
    if (index !== -1) {
      if (reactions_length === 0) {
        dependency.reactions = null;
      } else {
        reactions[index] = reactions[reactions_length];
        reactions.pop();
      }
    }
  }
  if (reactions_length === 0 && (dependency.f & DERIVED) !== 0) {
    set_signal_status(dependency, MAYBE_DIRTY);
    if ((dependency.f & (UNOWNED | DISCONNECTED)) === 0) {
      dependency.f ^= DISCONNECTED;
    }
    remove_reactions(
      /** @type {Derived} **/
      dependency,
      0
    );
  }
}
function remove_reactions(signal, start_index) {
  var dependencies = signal.deps;
  if (dependencies === null) return;
  var active_dependencies = start_index === 0 ? null : dependencies.slice(0, start_index);
  var seen = /* @__PURE__ */ new Set();
  for (var i = start_index; i < dependencies.length; i++) {
    var dependency = dependencies[i];
    if (seen.has(dependency)) continue;
    seen.add(dependency);
    if (active_dependencies === null || !active_dependencies.includes(dependency)) {
      remove_reaction(signal, dependency);
    }
  }
}
function destroy_effect_children(signal, remove_dom = false) {
  var effect2 = signal.first;
  signal.first = signal.last = null;
  while (effect2 !== null) {
    var next = effect2.next;
    destroy_effect(effect2, remove_dom);
    effect2 = next;
  }
}
function update_effect(effect2) {
  var flags = effect2.f;
  if ((flags & DESTROYED) !== 0) {
    return;
  }
  set_signal_status(effect2, CLEAN);
  var component_context = effect2.ctx;
  var previous_effect = current_effect;
  var previous_component_context = current_component_context;
  current_effect = effect2;
  current_component_context = component_context;
  try {
    if ((flags & BLOCK_EFFECT) === 0) {
      destroy_effect_children(effect2);
    }
    execute_effect_teardown(effect2);
    var teardown2 = update_reaction(effect2);
    effect2.teardown = typeof teardown2 === "function" ? teardown2 : null;
    effect2.version = current_version;
  } catch (error) {
    handle_error(
      /** @type {Error} */
      error
    );
  } finally {
    current_effect = previous_effect;
    current_component_context = previous_component_context;
  }
}
function infinite_loop_guard() {
  if (flush_count > 1e3) {
    flush_count = 0;
    effect_update_depth_exceeded();
  }
  flush_count++;
}
function flush_queued_root_effects(root_effects) {
  var length = root_effects.length;
  if (length === 0) {
    return;
  }
  infinite_loop_guard();
  var previously_flushing_effect = is_flushing_effect;
  is_flushing_effect = true;
  try {
    for (var i = 0; i < length; i++) {
      var effect2 = root_effects[i];
      if (effect2.first === null && (effect2.f & BRANCH_EFFECT) === 0) {
        flush_queued_effects([effect2]);
      } else {
        var collected_effects = [];
        process_effects(effect2, collected_effects);
        flush_queued_effects(collected_effects);
      }
    }
  } finally {
    is_flushing_effect = previously_flushing_effect;
  }
}
function flush_queued_effects(effects) {
  var length = effects.length;
  if (length === 0) return;
  for (var i = 0; i < length; i++) {
    var effect2 = effects[i];
    if ((effect2.f & (DESTROYED | INERT)) === 0 && check_dirtiness(effect2)) {
      update_effect(effect2);
      if (effect2.deps === null && effect2.first === null && effect2.nodes === null) {
        if (effect2.teardown === null) {
          unlink_effect(effect2);
        } else {
          effect2.fn = null;
        }
      }
    }
  }
}
function process_deferred() {
  is_micro_task_queued = false;
  if (flush_count > 1001) {
    return;
  }
  const previous_queued_root_effects = current_queued_root_effects;
  current_queued_root_effects = [];
  flush_queued_root_effects(previous_queued_root_effects);
  if (!is_micro_task_queued) {
    flush_count = 0;
  }
}
function schedule_effect(signal) {
  if (current_scheduler_mode === FLUSH_MICROTASK) {
    if (!is_micro_task_queued) {
      is_micro_task_queued = true;
      queueMicrotask(process_deferred);
    }
  }
  var effect2 = signal;
  while (effect2.parent !== null) {
    effect2 = effect2.parent;
    var flags = effect2.f;
    if ((flags & BRANCH_EFFECT) !== 0) {
      if ((flags & CLEAN) === 0) return;
      set_signal_status(effect2, MAYBE_DIRTY);
    }
  }
  current_queued_root_effects.push(effect2);
}
function process_effects(effect2, collected_effects) {
  var current_effect2 = effect2.first;
  var effects = [];
  main_loop: while (current_effect2 !== null) {
    var flags = current_effect2.f;
    var is_active = (flags & (DESTROYED | INERT)) === 0;
    var is_branch = flags & BRANCH_EFFECT;
    var is_clean = (flags & CLEAN) !== 0;
    var child = current_effect2.first;
    if (is_active && (!is_branch || !is_clean)) {
      if (is_branch) {
        set_signal_status(current_effect2, CLEAN);
      }
      if ((flags & RENDER_EFFECT) !== 0) {
        if (!is_branch && check_dirtiness(current_effect2)) {
          update_effect(current_effect2);
          child = current_effect2.first;
        }
        if (child !== null) {
          current_effect2 = child;
          continue;
        }
      } else if ((flags & EFFECT) !== 0) {
        if (is_branch || is_clean) {
          if (child !== null) {
            current_effect2 = child;
            continue;
          }
        } else {
          effects.push(current_effect2);
        }
      }
    }
    var sibling = current_effect2.next;
    if (sibling === null) {
      let parent = current_effect2.parent;
      while (parent !== null) {
        if (effect2 === parent) {
          break main_loop;
        }
        var parent_sibling = parent.next;
        if (parent_sibling !== null) {
          current_effect2 = parent_sibling;
          continue main_loop;
        }
        parent = parent.parent;
      }
    }
    current_effect2 = sibling;
  }
  for (var i = 0; i < effects.length; i++) {
    child = effects[i];
    collected_effects.push(child);
    process_effects(child, collected_effects);
  }
}
function flush_sync(fn) {
  var previous_scheduler_mode = current_scheduler_mode;
  var previous_queued_root_effects = current_queued_root_effects;
  try {
    infinite_loop_guard();
    const root_effects = [];
    current_scheduler_mode = FLUSH_SYNC;
    current_queued_root_effects = root_effects;
    is_micro_task_queued = false;
    flush_queued_root_effects(previous_queued_root_effects);
    var result = fn == null ? void 0 : fn();
    flush_tasks();
    if (current_queued_root_effects.length > 0 || root_effects.length > 0) {
      flush_sync();
    }
    flush_count = 0;
    return result;
  } finally {
    current_scheduler_mode = previous_scheduler_mode;
    current_queued_root_effects = previous_queued_root_effects;
  }
}
async function tick() {
  await Promise.resolve();
  flush_sync();
}
function get(signal) {
  var flags = signal.f;
  if ((flags & DESTROYED) !== 0) {
    return signal.v;
  }
  if (current_reaction !== null) {
    var deps = current_reaction.deps;
    if (new_deps === null && deps !== null && deps[skipped_deps] === signal) {
      skipped_deps++;
    } else if (deps === null || skipped_deps === 0 || deps[skipped_deps - 1] !== signal) {
      if (new_deps === null) {
        new_deps = [signal];
      } else if (new_deps[new_deps.length - 1] !== signal) {
        new_deps.push(signal);
      }
    }
    if (current_untracked_writes !== null && current_effect !== null && (current_effect.f & CLEAN) !== 0 && (current_effect.f & BRANCH_EFFECT) === 0 && current_untracked_writes.includes(signal)) {
      set_signal_status(current_effect, DIRTY);
      schedule_effect(current_effect);
    }
  }
  if ((flags & DERIVED) !== 0) {
    var derived2 = (
      /** @type {Derived} */
      signal
    );
    if (check_dirtiness(derived2)) {
      update_derived(derived2);
    }
  }
  return signal.v;
}
function untrack(fn) {
  const previous_reaction = current_reaction;
  try {
    current_reaction = null;
    return fn();
  } finally {
    current_reaction = previous_reaction;
  }
}
const STATUS_MASK = ~(DIRTY | MAYBE_DIRTY | CLEAN);
function set_signal_status(signal, status) {
  signal.f = signal.f & STATUS_MASK | status;
}
function push(props, runes = false, fn) {
  current_component_context = {
    p: current_component_context,
    c: null,
    e: null,
    m: false,
    s: props,
    x: null,
    l: null
  };
  if (!runes) {
    current_component_context.l = {
      s: null,
      u: null,
      r1: [],
      r2: /* @__PURE__ */ source(false)
    };
  }
}
function pop(component) {
  const context_stack_item = current_component_context;
  if (context_stack_item !== null) {
    const effects = context_stack_item.e;
    if (effects !== null) {
      context_stack_item.e = null;
      for (var i = 0; i < effects.length; i++) {
        effect(effects[i]);
      }
    }
    current_component_context = context_stack_item.p;
    context_stack_item.m = true;
  }
  return (
    /** @type {T} */
    {}
  );
}
function deep_read_state(value) {
  if (typeof value !== "object" || !value || value instanceof EventTarget) {
    return;
  }
  if (STATE_SYMBOL in value) {
    deep_read(value);
  } else if (!Array.isArray(value)) {
    for (let key in value) {
      const prop = value[key];
      if (typeof prop === "object" && prop && STATE_SYMBOL in prop) {
        deep_read(prop);
      }
    }
  }
}
function deep_read(value, visited = /* @__PURE__ */ new Set()) {
  if (typeof value === "object" && value !== null && // We don't want to traverse DOM elements
  !(value instanceof EventTarget) && !visited.has(value)) {
    visited.add(value);
    if (value instanceof Date) {
      value.getTime();
    }
    for (let key in value) {
      try {
        deep_read(value[key], visited);
      } catch (e) {
      }
    }
    const proto = get_prototype_of(value);
    if (proto !== Object.prototype && proto !== Array.prototype && proto !== Map.prototype && proto !== Set.prototype && proto !== Date.prototype) {
      const descriptors = get_descriptors(proto);
      for (let key in descriptors) {
        const get2 = descriptors[key].get;
        if (get2) {
          try {
            get2.call(value);
          } catch (e) {
          }
        }
      }
    }
  }
}
export {
  source as A,
  get_descriptor as B,
  get_prototype_of as C,
  block as D,
  resume_effect as E,
  pause_effect as F,
  EFFECT_TRANSPARENT as G,
  effect as H,
  render_effect as I,
  queue_micro_task as J,
  props_invalid_value as K,
  LEGACY_DERIVED_PROP as L,
  safe_equals as M,
  derived as N,
  derived_safe_equal as O,
  flush_sync as P,
  tick as Q,
  safe_not_equal as R,
  STATE_FROZEN_SYMBOL as S,
  array_from as a,
  branch as b,
  current_effect as c,
  define_property as d,
  effect_root as e,
  pop as f,
  current_component_context as g,
  hydration_failed as h,
  is_array as i,
  user_effect as j,
  untrack as k,
  run as l,
  get as m,
  deep_read_state as n,
  noop as o,
  push as p,
  mutable_source as q,
  run_all as r,
  set as s,
  teardown as t,
  user_pre_effect as u,
  template_effect as v,
  is_frozen as w,
  STATE_SYMBOL as x,
  object_prototype as y,
  array_prototype as z
};
//# sourceMappingURL=runtime.DOfOf6MH.js.map
