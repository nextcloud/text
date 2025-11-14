const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireMipsasm } from "./mipsasm-nOqW--QM.chunk.mjs";
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
var mipsasm_js$2;
var hasRequiredMipsasm_js;
function requireMipsasm_js() {
  if (hasRequiredMipsasm_js) return mipsasm_js$2;
  hasRequiredMipsasm_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/mipsasm" instead of "highlight.js/lib/languages/mipsasm.js"'
      );
    }
  }
  emitWarning();
  mipsasm_js$2 = /* @__PURE__ */ requireMipsasm();
  return mipsasm_js$2;
}
var mipsasm_jsExports = /* @__PURE__ */ requireMipsasm_js();
const mipsasm_js = /* @__PURE__ */ getDefaultExportFromCjs(mipsasm_jsExports);
const mipsasm_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: mipsasm_js
}, [mipsasm_jsExports]);
export {
  mipsasm_js$1 as m
};
//# sourceMappingURL=mipsasm.js-DJL4t-jB.chunk.mjs.map
