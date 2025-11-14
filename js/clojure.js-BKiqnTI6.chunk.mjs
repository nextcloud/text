const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireClojure } from "./clojure-DgamHP6V.chunk.mjs";
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
var clojure_js$2;
var hasRequiredClojure_js;
function requireClojure_js() {
  if (hasRequiredClojure_js) return clojure_js$2;
  hasRequiredClojure_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/clojure" instead of "highlight.js/lib/languages/clojure.js"'
      );
    }
  }
  emitWarning();
  clojure_js$2 = /* @__PURE__ */ requireClojure();
  return clojure_js$2;
}
var clojure_jsExports = /* @__PURE__ */ requireClojure_js();
const clojure_js = /* @__PURE__ */ getDefaultExportFromCjs(clojure_jsExports);
const clojure_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: clojure_js
}, [clojure_jsExports]);
export {
  clojure_js$1 as c
};
//# sourceMappingURL=clojure.js-BKiqnTI6.chunk.mjs.map
