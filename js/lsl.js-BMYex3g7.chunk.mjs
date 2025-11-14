const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireLsl } from "./lsl-BUysz_Gh.chunk.mjs";
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
var lsl_js$2;
var hasRequiredLsl_js;
function requireLsl_js() {
  if (hasRequiredLsl_js) return lsl_js$2;
  hasRequiredLsl_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/lsl" instead of "highlight.js/lib/languages/lsl.js"'
      );
    }
  }
  emitWarning();
  lsl_js$2 = /* @__PURE__ */ requireLsl();
  return lsl_js$2;
}
var lsl_jsExports = /* @__PURE__ */ requireLsl_js();
const lsl_js = /* @__PURE__ */ getDefaultExportFromCjs(lsl_jsExports);
const lsl_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: lsl_js
}, [lsl_jsExports]);
export {
  lsl_js$1 as l
};
//# sourceMappingURL=lsl.js-BMYex3g7.chunk.mjs.map
