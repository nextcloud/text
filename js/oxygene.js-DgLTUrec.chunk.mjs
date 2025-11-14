const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireOxygene } from "./oxygene-6rBLO8S1.chunk.mjs";
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
var oxygene_js$2;
var hasRequiredOxygene_js;
function requireOxygene_js() {
  if (hasRequiredOxygene_js) return oxygene_js$2;
  hasRequiredOxygene_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/oxygene" instead of "highlight.js/lib/languages/oxygene.js"'
      );
    }
  }
  emitWarning();
  oxygene_js$2 = /* @__PURE__ */ requireOxygene();
  return oxygene_js$2;
}
var oxygene_jsExports = /* @__PURE__ */ requireOxygene_js();
const oxygene_js = /* @__PURE__ */ getDefaultExportFromCjs(oxygene_jsExports);
const oxygene_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: oxygene_js
}, [oxygene_jsExports]);
export {
  oxygene_js$1 as o
};
//# sourceMappingURL=oxygene.js-DgLTUrec.chunk.mjs.map
