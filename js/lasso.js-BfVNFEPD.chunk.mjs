const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireLasso } from "./lasso-DELbdTp1.chunk.mjs";
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
var lasso_js$2;
var hasRequiredLasso_js;
function requireLasso_js() {
  if (hasRequiredLasso_js) return lasso_js$2;
  hasRequiredLasso_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/lasso" instead of "highlight.js/lib/languages/lasso.js"'
      );
    }
  }
  emitWarning();
  lasso_js$2 = /* @__PURE__ */ requireLasso();
  return lasso_js$2;
}
var lasso_jsExports = /* @__PURE__ */ requireLasso_js();
const lasso_js = /* @__PURE__ */ getDefaultExportFromCjs(lasso_jsExports);
const lasso_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: lasso_js
}, [lasso_jsExports]);
export {
  lasso_js$1 as l
};
//# sourceMappingURL=lasso.js-BfVNFEPD.chunk.mjs.map
