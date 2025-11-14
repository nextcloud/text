const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireLatex } from "./latex-Bk0N2XgG.chunk.mjs";
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
var latex_js$2;
var hasRequiredLatex_js;
function requireLatex_js() {
  if (hasRequiredLatex_js) return latex_js$2;
  hasRequiredLatex_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/latex" instead of "highlight.js/lib/languages/latex.js"'
      );
    }
  }
  emitWarning();
  latex_js$2 = /* @__PURE__ */ requireLatex();
  return latex_js$2;
}
var latex_jsExports = /* @__PURE__ */ requireLatex_js();
const latex_js = /* @__PURE__ */ getDefaultExportFromCjs(latex_jsExports);
const latex_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: latex_js
}, [latex_jsExports]);
export {
  latex_js$1 as l
};
//# sourceMappingURL=latex.js-DfECXU7B.chunk.mjs.map
