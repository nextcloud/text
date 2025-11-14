const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireCrmsh } from "./crmsh-BNz3y02B.chunk.mjs";
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
var crmsh_js$2;
var hasRequiredCrmsh_js;
function requireCrmsh_js() {
  if (hasRequiredCrmsh_js) return crmsh_js$2;
  hasRequiredCrmsh_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/crmsh" instead of "highlight.js/lib/languages/crmsh.js"'
      );
    }
  }
  emitWarning();
  crmsh_js$2 = /* @__PURE__ */ requireCrmsh();
  return crmsh_js$2;
}
var crmsh_jsExports = /* @__PURE__ */ requireCrmsh_js();
const crmsh_js = /* @__PURE__ */ getDefaultExportFromCjs(crmsh_jsExports);
const crmsh_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: crmsh_js
}, [crmsh_jsExports]);
export {
  crmsh_js$1 as c
};
//# sourceMappingURL=crmsh.js-8db052uu.chunk.mjs.map
