const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireLeaf } from "./leaf-DYkbBiHU.chunk.mjs";
function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    const e = m[i];
    if (typeof e !== "string" && !Array.isArray(e)) {
      for (const k in e) {
        if (k !== "default" && !(k in n)) {
          const d = Object.getOwnPropertyDescriptor(e, k);
          if (d) {
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: () => e[k]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
var leaf_js$2;
var hasRequiredLeaf_js;
function requireLeaf_js() {
  if (hasRequiredLeaf_js) return leaf_js$2;
  hasRequiredLeaf_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/leaf" instead of "highlight.js/lib/languages/leaf.js"'
      );
    }
  }
  emitWarning();
  leaf_js$2 = /* @__PURE__ */ requireLeaf();
  return leaf_js$2;
}
var leaf_jsExports = /* @__PURE__ */ requireLeaf_js();
const leaf_js = /* @__PURE__ */ getDefaultExportFromCjs(leaf_jsExports);
const leaf_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: leaf_js
}, [leaf_jsExports]);
export {
  leaf_js$1 as l
};
//# sourceMappingURL=leaf.js-vqyrHBtO.chunk.mjs.map
