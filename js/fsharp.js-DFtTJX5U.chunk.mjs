const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireFsharp } from "./fsharp-CaEpdFk1.chunk.mjs";
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
var fsharp_js$2;
var hasRequiredFsharp_js;
function requireFsharp_js() {
  if (hasRequiredFsharp_js) return fsharp_js$2;
  hasRequiredFsharp_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/fsharp" instead of "highlight.js/lib/languages/fsharp.js"'
      );
    }
  }
  emitWarning();
  fsharp_js$2 = /* @__PURE__ */ requireFsharp();
  return fsharp_js$2;
}
var fsharp_jsExports = /* @__PURE__ */ requireFsharp_js();
const fsharp_js = /* @__PURE__ */ getDefaultExportFromCjs(fsharp_jsExports);
const fsharp_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: fsharp_js
}, [fsharp_jsExports]);
export {
  fsharp_js$1 as f
};
//# sourceMappingURL=fsharp.js-DFtTJX5U.chunk.mjs.map
