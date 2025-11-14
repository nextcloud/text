const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requirePowershell } from "./powershell-DrX8yGKZ.chunk.mjs";
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
var powershell_js$2;
var hasRequiredPowershell_js;
function requirePowershell_js() {
  if (hasRequiredPowershell_js) return powershell_js$2;
  hasRequiredPowershell_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/powershell" instead of "highlight.js/lib/languages/powershell.js"'
      );
    }
  }
  emitWarning();
  powershell_js$2 = /* @__PURE__ */ requirePowershell();
  return powershell_js$2;
}
var powershell_jsExports = /* @__PURE__ */ requirePowershell_js();
const powershell_js = /* @__PURE__ */ getDefaultExportFromCjs(powershell_jsExports);
const powershell_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: powershell_js
}, [powershell_jsExports]);
export {
  powershell_js$1 as p
};
//# sourceMappingURL=powershell.js-CDIovbfR.chunk.mjs.map
