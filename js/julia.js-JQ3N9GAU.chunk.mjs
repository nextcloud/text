const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireJulia } from "./julia-BvR0UbqE.chunk.mjs";
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
var julia_js$2;
var hasRequiredJulia_js;
function requireJulia_js() {
  if (hasRequiredJulia_js) return julia_js$2;
  hasRequiredJulia_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/julia" instead of "highlight.js/lib/languages/julia.js"'
      );
    }
  }
  emitWarning();
  julia_js$2 = /* @__PURE__ */ requireJulia();
  return julia_js$2;
}
var julia_jsExports = /* @__PURE__ */ requireJulia_js();
const julia_js = /* @__PURE__ */ getDefaultExportFromCjs(julia_jsExports);
const julia_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: julia_js
}, [julia_jsExports]);
export {
  julia_js$1 as j
};
//# sourceMappingURL=julia.js-JQ3N9GAU.chunk.mjs.map
