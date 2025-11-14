const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireMercury } from "./mercury-9wBlGonR.chunk.mjs";
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
var mercury_js$2;
var hasRequiredMercury_js;
function requireMercury_js() {
  if (hasRequiredMercury_js) return mercury_js$2;
  hasRequiredMercury_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/mercury" instead of "highlight.js/lib/languages/mercury.js"'
      );
    }
  }
  emitWarning();
  mercury_js$2 = /* @__PURE__ */ requireMercury();
  return mercury_js$2;
}
var mercury_jsExports = /* @__PURE__ */ requireMercury_js();
const mercury_js = /* @__PURE__ */ getDefaultExportFromCjs(mercury_jsExports);
const mercury_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: mercury_js
}, [mercury_jsExports]);
export {
  mercury_js$1 as m
};
//# sourceMappingURL=mercury.js-CmBtG600.chunk.mjs.map
