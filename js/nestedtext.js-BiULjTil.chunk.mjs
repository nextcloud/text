const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireNestedtext } from "./nestedtext-2WJ_JYQo.chunk.mjs";
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
var nestedtext_js$2;
var hasRequiredNestedtext_js;
function requireNestedtext_js() {
  if (hasRequiredNestedtext_js) return nestedtext_js$2;
  hasRequiredNestedtext_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/nestedtext" instead of "highlight.js/lib/languages/nestedtext.js"'
      );
    }
  }
  emitWarning();
  nestedtext_js$2 = /* @__PURE__ */ requireNestedtext();
  return nestedtext_js$2;
}
var nestedtext_jsExports = /* @__PURE__ */ requireNestedtext_js();
const nestedtext_js = /* @__PURE__ */ getDefaultExportFromCjs(nestedtext_jsExports);
const nestedtext_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: nestedtext_js
}, [nestedtext_jsExports]);
export {
  nestedtext_js$1 as n
};
//# sourceMappingURL=nestedtext.js-BiULjTil.chunk.mjs.map
