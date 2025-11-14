const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireSas } from "./sas-CBw8mTfI.chunk.mjs";
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
var sas_js$2;
var hasRequiredSas_js;
function requireSas_js() {
  if (hasRequiredSas_js) return sas_js$2;
  hasRequiredSas_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/sas" instead of "highlight.js/lib/languages/sas.js"'
      );
    }
  }
  emitWarning();
  sas_js$2 = /* @__PURE__ */ requireSas();
  return sas_js$2;
}
var sas_jsExports = /* @__PURE__ */ requireSas_js();
const sas_js = /* @__PURE__ */ getDefaultExportFromCjs(sas_jsExports);
const sas_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: sas_js
}, [sas_jsExports]);
export {
  sas_js$1 as s
};
//# sourceMappingURL=sas.js-BgiTEM-U.chunk.mjs.map
