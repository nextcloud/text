const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireKotlin } from "./kotlin-BIOYM3rs.chunk.mjs";
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
var kotlin_js$2;
var hasRequiredKotlin_js;
function requireKotlin_js() {
  if (hasRequiredKotlin_js) return kotlin_js$2;
  hasRequiredKotlin_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/kotlin" instead of "highlight.js/lib/languages/kotlin.js"'
      );
    }
  }
  emitWarning();
  kotlin_js$2 = /* @__PURE__ */ requireKotlin();
  return kotlin_js$2;
}
var kotlin_jsExports = /* @__PURE__ */ requireKotlin_js();
const kotlin_js = /* @__PURE__ */ getDefaultExportFromCjs(kotlin_jsExports);
const kotlin_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: kotlin_js
}, [kotlin_jsExports]);
export {
  kotlin_js$1 as k
};
//# sourceMappingURL=kotlin.js-BZDatv0W.chunk.mjs.map
