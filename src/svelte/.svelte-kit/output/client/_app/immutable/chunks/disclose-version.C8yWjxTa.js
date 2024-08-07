import { c as current_effect } from "./runtime.DOfOf6MH.js";
function hydration_mismatch(location) {
  {
    console.warn("hydration_mismatch");
  }
}
const PROPS_IS_IMMUTABLE = 1;
const PROPS_IS_RUNES = 1 << 1;
const PROPS_IS_UPDATED = 1 << 2;
const PROPS_IS_LAZY_INITIAL = 1 << 3;
const TEMPLATE_FRAGMENT = 1;
const TEMPLATE_USE_IMPORT_NODE = 1 << 1;
const HYDRATION_START = "[";
const HYDRATION_START_ELSE = "[!";
const HYDRATION_END = "]";
const HYDRATION_ERROR = {};
const UNINITIALIZED = Symbol();
let hydrating = false;
function set_hydrating(value) {
  hydrating = value;
}
let hydrate_node;
function set_hydrate_node(node) {
  return hydrate_node = node;
}
function hydrate_next() {
  if (hydrate_node === null) {
    hydration_mismatch();
    throw HYDRATION_ERROR;
  }
  return hydrate_node = /** @type {TemplateNode} */
  hydrate_node.nextSibling;
}
function reset(node) {
  if (hydrating) {
    hydrate_node = node;
  }
}
function next() {
  if (hydrating) {
    hydrate_next();
  }
}
function remove_nodes() {
  var depth = 0;
  var node = hydrate_node;
  while (true) {
    if (node.nodeType === 8) {
      var data = (
        /** @type {Comment} */
        node.data
      );
      if (data === HYDRATION_END) {
        if (depth === 0) return node;
        depth -= 1;
      } else if (data === HYDRATION_START || data === HYDRATION_START_ELSE) {
        depth += 1;
      }
    }
    var next2 = (
      /** @type {TemplateNode} */
      node.nextSibling
    );
    node.remove();
    node = next2;
  }
}
var $window;
function init_operations() {
  if ($window !== void 0) {
    return;
  }
  $window = window;
  var element_prototype = Element.prototype;
  element_prototype.__click = void 0;
  element_prototype.__className = "";
  element_prototype.__attributes = null;
  element_prototype.__e = void 0;
  Text.prototype.__t = void 0;
}
function empty() {
  return document.createTextNode("");
}
function child(node) {
  if (!hydrating) {
    return node.firstChild;
  }
  var child2 = (
    /** @type {TemplateNode} */
    hydrate_node.firstChild
  );
  if (child2 === null) {
    child2 = hydrate_node.appendChild(empty());
  }
  set_hydrate_node(child2);
  return child2;
}
function first_child(fragment, is_text) {
  if (!hydrating) {
    var first = (
      /** @type {DocumentFragment} */
      fragment.firstChild
    );
    if (first instanceof Comment && first.data === "") return first.nextSibling;
    return first;
  }
  return hydrate_node;
}
function sibling(node, is_text = false) {
  if (!hydrating) {
    return (
      /** @type {TemplateNode} */
      node.nextSibling
    );
  }
  var next_sibling = (
    /** @type {TemplateNode} */
    hydrate_node.nextSibling
  );
  var type = next_sibling.nodeType;
  if (is_text && type !== 3) {
    var text2 = empty();
    next_sibling == null ? void 0 : next_sibling.before(text2);
    set_hydrate_node(text2);
    return text2;
  }
  set_hydrate_node(next_sibling);
  return (
    /** @type {TemplateNode} */
    next_sibling
  );
}
function clear_text_content(node) {
  node.textContent = "";
}
function create_fragment_from_html(html) {
  var elem = document.createElement("template");
  elem.innerHTML = html;
  return elem.content;
}
function assign_nodes(start, end) {
  var _a;
  (_a = current_effect).nodes ?? (_a.nodes = { start, end });
}
// @__NO_SIDE_EFFECTS__
function template(content, flags) {
  var is_fragment = (flags & TEMPLATE_FRAGMENT) !== 0;
  var use_import_node = (flags & TEMPLATE_USE_IMPORT_NODE) !== 0;
  var node;
  var has_start = !content.startsWith("<!>");
  return () => {
    if (hydrating) {
      assign_nodes(hydrate_node, null);
      return hydrate_node;
    }
    if (!node) {
      node = create_fragment_from_html(has_start ? content : "<!>" + content);
      if (!is_fragment) node = /** @type {Node} */
      node.firstChild;
    }
    var clone = (
      /** @type {TemplateNode} */
      use_import_node ? document.importNode(node, true) : node.cloneNode(true)
    );
    if (is_fragment) {
      var start = (
        /** @type {TemplateNode} */
        clone.firstChild
      );
      var end = (
        /** @type {TemplateNode} */
        clone.lastChild
      );
      assign_nodes(start, end);
    } else {
      assign_nodes(clone, clone);
    }
    return clone;
  };
}
function text() {
  if (!hydrating) {
    var t = empty();
    assign_nodes(t, t);
    return t;
  }
  var node = hydrate_node;
  if (node.nodeType !== 3) {
    node.before(node = empty());
    set_hydrate_node(node);
  }
  assign_nodes(node, node);
  return node;
}
function comment() {
  if (hydrating) {
    assign_nodes(hydrate_node, null);
    return hydrate_node;
  }
  var frag = document.createDocumentFragment();
  var start = document.createComment("");
  var anchor = empty();
  frag.append(start, anchor);
  assign_nodes(start, anchor);
  return frag;
}
function append(anchor, dom) {
  if (hydrating) {
    current_effect.nodes.end = hydrate_node;
    hydrate_next();
    return;
  }
  if (anchor === null) {
    return;
  }
  anchor.before(
    /** @type {Node} */
    dom
  );
}
const PUBLIC_VERSION = "5";
if (typeof window !== "undefined")
  (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(PUBLIC_VERSION);
export {
  HYDRATION_START as H,
  PROPS_IS_UPDATED as P,
  UNINITIALIZED as U,
  append as a,
  hydrate_next as b,
  child as c,
  comment as d,
  empty as e,
  first_child as f,
  HYDRATION_ERROR as g,
  hydrating as h,
  set_hydrating as i,
  set_hydrate_node as j,
  hydrate_node as k,
  HYDRATION_END as l,
  hydration_mismatch as m,
  next as n,
  init_operations as o,
  clear_text_content as p,
  assign_nodes as q,
  reset as r,
  sibling as s,
  template as t,
  HYDRATION_START_ELSE as u,
  remove_nodes as v,
  PROPS_IS_IMMUTABLE as w,
  PROPS_IS_RUNES as x,
  PROPS_IS_LAZY_INITIAL as y,
  text as z
};
//# sourceMappingURL=disclose-version.C8yWjxTa.js.map
