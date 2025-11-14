const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requirePf } from "./pf-C42Jfn-U.chunk.mjs";
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
var pf_js$2;
var hasRequiredPf_js;
function requirePf_js() {
  if (hasRequiredPf_js) return pf_js$2;
  hasRequiredPf_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/pf" instead of "highlight.js/lib/languages/pf.js"'
      );
    }
  }
  emitWarning();
  pf_js$2 = /* @__PURE__ */ requirePf();
  return pf_js$2;
}
var pf_jsExports = /* @__PURE__ */ requirePf_js();
const pf_js = /* @__PURE__ */ getDefaultExportFromCjs(pf_jsExports);
const pf_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: pf_js
}, [pf_jsExports]);
export {
  pf_js$1 as p
};
//# sourceMappingURL=pf.js-HooW-0zR.chunk.mjs.map
