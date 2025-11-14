const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireLlvm } from "./llvm-Bq_QU-7q.chunk.mjs";
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
var llvm_js$2;
var hasRequiredLlvm_js;
function requireLlvm_js() {
  if (hasRequiredLlvm_js) return llvm_js$2;
  hasRequiredLlvm_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/llvm" instead of "highlight.js/lib/languages/llvm.js"'
      );
    }
  }
  emitWarning();
  llvm_js$2 = /* @__PURE__ */ requireLlvm();
  return llvm_js$2;
}
var llvm_jsExports = /* @__PURE__ */ requireLlvm_js();
const llvm_js = /* @__PURE__ */ getDefaultExportFromCjs(llvm_jsExports);
const llvm_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: llvm_js
}, [llvm_jsExports]);
export {
  llvm_js$1 as l
};
//# sourceMappingURL=llvm.js-CqLcovO8.chunk.mjs.map
