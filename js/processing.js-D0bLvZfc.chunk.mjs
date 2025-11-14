const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireProcessing } from "./processing-B59J24jo.chunk.mjs";
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
var processing_js$2;
var hasRequiredProcessing_js;
function requireProcessing_js() {
  if (hasRequiredProcessing_js) return processing_js$2;
  hasRequiredProcessing_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/processing" instead of "highlight.js/lib/languages/processing.js"'
      );
    }
  }
  emitWarning();
  processing_js$2 = /* @__PURE__ */ requireProcessing();
  return processing_js$2;
}
var processing_jsExports = /* @__PURE__ */ requireProcessing_js();
const processing_js = /* @__PURE__ */ getDefaultExportFromCjs(processing_jsExports);
const processing_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: processing_js
}, [processing_jsExports]);
export {
  processing_js$1 as p
};
//# sourceMappingURL=processing.js-D0bLvZfc.chunk.mjs.map
