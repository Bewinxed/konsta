import { h as hydrating, b as hydrate_next, d as comment, f as first_child, a as append } from "../chunks/disclose-version.C8yWjxTa.js";
function slot(anchor, slot_fn, slot_props, fallback_fn) {
  if (hydrating) {
    hydrate_next();
  }
  if (slot_fn === void 0) ;
  else {
    slot_fn(anchor, slot_props);
  }
}
function default_slot($$props) {
  var _a;
  var children = (_a = $$props.$$slots) == null ? void 0 : _a.default;
  if (children === true) {
    return $$props.children;
  } else {
    return children;
  }
}
function Layout($$anchor, $$props) {
  var fragment = comment();
  var node = first_child(fragment);
  slot(node, default_slot($$props), {});
  append($$anchor, fragment);
}
export {
  Layout as component
};
//# sourceMappingURL=0.Dcav0BKZ.js.map
