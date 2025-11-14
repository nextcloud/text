const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireMaxima } from "./maxima-oJkgmqGB.chunk.mjs";
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
var maxima_js$2;
var hasRequiredMaxima_js;
function requireMaxima_js() {
  if (hasRequiredMaxima_js) return maxima_js$2;
  hasRequiredMaxima_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/maxima" instead of "highlight.js/lib/languages/maxima.js"'
      );
    }
  }
  emitWarning();
  maxima_js$2 = /* @__PURE__ */ requireMaxima();
  return maxima_js$2;
}
var maxima_jsExports = /* @__PURE__ */ requireMaxima_js();
const maxima_js = /* @__PURE__ */ getDefaultExportFromCjs(maxima_jsExports);
const maxima_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: maxima_js
}, [maxima_jsExports]);
export {
  maxima_js$1 as m
};
//# sourceMappingURL=maxima.js-CZ8kz1iZ.chunk.mjs.map
