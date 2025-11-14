const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireMathematica } from "./mathematica-S1PkUuoP.chunk.mjs";
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
var mathematica_js$2;
var hasRequiredMathematica_js;
function requireMathematica_js() {
  if (hasRequiredMathematica_js) return mathematica_js$2;
  hasRequiredMathematica_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/mathematica" instead of "highlight.js/lib/languages/mathematica.js"'
      );
    }
  }
  emitWarning();
  mathematica_js$2 = /* @__PURE__ */ requireMathematica();
  return mathematica_js$2;
}
var mathematica_jsExports = /* @__PURE__ */ requireMathematica_js();
const mathematica_js = /* @__PURE__ */ getDefaultExportFromCjs(mathematica_jsExports);
const mathematica_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: mathematica_js
}, [mathematica_jsExports]);
export {
  mathematica_js$1 as m
};
//# sourceMappingURL=mathematica.js-CG04A1tE.chunk.mjs.map
