const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireFortran } from "./fortran-BuDP7Cu6.chunk.mjs";
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
var fortran_js$2;
var hasRequiredFortran_js;
function requireFortran_js() {
  if (hasRequiredFortran_js) return fortran_js$2;
  hasRequiredFortran_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/fortran" instead of "highlight.js/lib/languages/fortran.js"'
      );
    }
  }
  emitWarning();
  fortran_js$2 = /* @__PURE__ */ requireFortran();
  return fortran_js$2;
}
var fortran_jsExports = /* @__PURE__ */ requireFortran_js();
const fortran_js = /* @__PURE__ */ getDefaultExportFromCjs(fortran_jsExports);
const fortran_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: fortran_js
}, [fortran_jsExports]);
export {
  fortran_js$1 as f
};
//# sourceMappingURL=fortran.js-Dg92rnlV.chunk.mjs.map
