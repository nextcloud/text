const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireJuliaRepl } from "./julia-repl-BNX5mEC0.chunk.mjs";
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
var juliaRepl_js$2;
var hasRequiredJuliaRepl_js;
function requireJuliaRepl_js() {
  if (hasRequiredJuliaRepl_js) return juliaRepl_js$2;
  hasRequiredJuliaRepl_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/julia-repl" instead of "highlight.js/lib/languages/julia-repl.js"'
      );
    }
  }
  emitWarning();
  juliaRepl_js$2 = /* @__PURE__ */ requireJuliaRepl();
  return juliaRepl_js$2;
}
var juliaRepl_jsExports = /* @__PURE__ */ requireJuliaRepl_js();
const juliaRepl_js = /* @__PURE__ */ getDefaultExportFromCjs(juliaRepl_jsExports);
const juliaRepl_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: juliaRepl_js
}, [juliaRepl_jsExports]);
export {
  juliaRepl_js$1 as j
};
//# sourceMappingURL=julia-repl.js-B7h8biG8.chunk.mjs.map
