const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireCsharp } from "./csharp-Bn_xR8h7.chunk.mjs";
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
var csharp_js$2;
var hasRequiredCsharp_js;
function requireCsharp_js() {
  if (hasRequiredCsharp_js) return csharp_js$2;
  hasRequiredCsharp_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/csharp" instead of "highlight.js/lib/languages/csharp.js"'
      );
    }
  }
  emitWarning();
  csharp_js$2 = /* @__PURE__ */ requireCsharp();
  return csharp_js$2;
}
var csharp_jsExports = /* @__PURE__ */ requireCsharp_js();
const csharp_js = /* @__PURE__ */ getDefaultExportFromCjs(csharp_jsExports);
const csharp_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: csharp_js
}, [csharp_jsExports]);
export {
  csharp_js$1 as c
};
//# sourceMappingURL=csharp.js-Dt_ePlE6.chunk.mjs.map
