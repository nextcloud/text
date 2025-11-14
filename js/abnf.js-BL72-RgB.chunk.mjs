const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireAbnf } from "./abnf-NvkePkrV.chunk.mjs";
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
var abnf_js$2;
var hasRequiredAbnf_js;
function requireAbnf_js() {
  if (hasRequiredAbnf_js) return abnf_js$2;
  hasRequiredAbnf_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/abnf" instead of "highlight.js/lib/languages/abnf.js"'
      );
    }
  }
  emitWarning();
  abnf_js$2 = /* @__PURE__ */ requireAbnf();
  return abnf_js$2;
}
var abnf_jsExports = /* @__PURE__ */ requireAbnf_js();
const abnf_js = /* @__PURE__ */ getDefaultExportFromCjs(abnf_jsExports);
const abnf_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: abnf_js
}, [abnf_jsExports]);
export {
  abnf_js$1 as a
};
//# sourceMappingURL=abnf.js-BL72-RgB.chunk.mjs.map
