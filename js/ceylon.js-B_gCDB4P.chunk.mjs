const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireCeylon } from "./ceylon-BX2OLnJH.chunk.mjs";
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
var ceylon_js$2;
var hasRequiredCeylon_js;
function requireCeylon_js() {
  if (hasRequiredCeylon_js) return ceylon_js$2;
  hasRequiredCeylon_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/ceylon" instead of "highlight.js/lib/languages/ceylon.js"'
      );
    }
  }
  emitWarning();
  ceylon_js$2 = /* @__PURE__ */ requireCeylon();
  return ceylon_js$2;
}
var ceylon_jsExports = /* @__PURE__ */ requireCeylon_js();
const ceylon_js = /* @__PURE__ */ getDefaultExportFromCjs(ceylon_jsExports);
const ceylon_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: ceylon_js
}, [ceylon_jsExports]);
export {
  ceylon_js$1 as c
};
//# sourceMappingURL=ceylon.js-B_gCDB4P.chunk.mjs.map
