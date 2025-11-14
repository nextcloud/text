const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireCsp } from "./csp-bLJ5mMt6.chunk.mjs";
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
var csp_js$2;
var hasRequiredCsp_js;
function requireCsp_js() {
  if (hasRequiredCsp_js) return csp_js$2;
  hasRequiredCsp_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/csp" instead of "highlight.js/lib/languages/csp.js"'
      );
    }
  }
  emitWarning();
  csp_js$2 = /* @__PURE__ */ requireCsp();
  return csp_js$2;
}
var csp_jsExports = /* @__PURE__ */ requireCsp_js();
const csp_js = /* @__PURE__ */ getDefaultExportFromCjs(csp_jsExports);
const csp_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: csp_js
}, [csp_jsExports]);
export {
  csp_js$1 as c
};
//# sourceMappingURL=csp.js-CEQ3sBk4.chunk.mjs.map
