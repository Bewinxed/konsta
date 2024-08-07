import { f as first_child, s as sibling, c as child, a as append, t as template, n as next, r as reset } from "../chunks/disclose-version.C8yWjxTa.js";
var root = template(`<h1>Welcome to your library project</h1> <p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p> <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>`, 1);
function _page($$anchor) {
  var fragment = root();
  var h1 = first_child(fragment);
  var p = sibling(sibling(h1, true));
  var p_1 = sibling(sibling(p, true));
  sibling(child(p_1));
  next();
  reset(p_1);
  append($$anchor, fragment);
}
export {
  _page as component
};
//# sourceMappingURL=2.BzUX7kiw.js.map
