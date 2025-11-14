const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireHaskell } from "./haskell-4ewLDIqa.chunk.mjs";
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
var haskell_js$2;
var hasRequiredHaskell_js;
function requireHaskell_js() {
  if (hasRequiredHaskell_js) return haskell_js$2;
  hasRequiredHaskell_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/haskell" instead of "highlight.js/lib/languages/haskell.js"'
      );
    }
  }
  emitWarning();
  haskell_js$2 = /* @__PURE__ */ requireHaskell();
  return haskell_js$2;
}
var haskell_jsExports = /* @__PURE__ */ requireHaskell_js();
const haskell_js = /* @__PURE__ */ getDefaultExportFromCjs(haskell_jsExports);
const haskell_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: haskell_js
}, [haskell_jsExports]);
export {
  haskell_js$1 as h
};
//# sourceMappingURL=haskell.js-XCij3sN5.chunk.mjs.map
