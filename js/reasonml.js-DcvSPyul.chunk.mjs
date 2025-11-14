const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireReasonml } from "./reasonml-lgKzVFBt.chunk.mjs";
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
var reasonml_js$2;
var hasRequiredReasonml_js;
function requireReasonml_js() {
  if (hasRequiredReasonml_js) return reasonml_js$2;
  hasRequiredReasonml_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/reasonml" instead of "highlight.js/lib/languages/reasonml.js"'
      );
    }
  }
  emitWarning();
  reasonml_js$2 = /* @__PURE__ */ requireReasonml();
  return reasonml_js$2;
}
var reasonml_jsExports = /* @__PURE__ */ requireReasonml_js();
const reasonml_js = /* @__PURE__ */ getDefaultExportFromCjs(reasonml_jsExports);
const reasonml_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: reasonml_js
}, [reasonml_jsExports]);
export {
  reasonml_js$1 as r
};
//# sourceMappingURL=reasonml.js-DcvSPyul.chunk.mjs.map
