const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireX86asm } from "./x86asm-Bs1z4bjj.chunk.mjs";
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
var x86asm_js$2;
var hasRequiredX86asm_js;
function requireX86asm_js() {
  if (hasRequiredX86asm_js) return x86asm_js$2;
  hasRequiredX86asm_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/x86asm" instead of "highlight.js/lib/languages/x86asm.js"'
      );
    }
  }
  emitWarning();
  x86asm_js$2 = /* @__PURE__ */ requireX86asm();
  return x86asm_js$2;
}
var x86asm_jsExports = /* @__PURE__ */ requireX86asm_js();
const x86asm_js = /* @__PURE__ */ getDefaultExportFromCjs(x86asm_jsExports);
const x86asm_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: x86asm_js
}, [x86asm_jsExports]);
export {
  x86asm_js$1 as x
};
//# sourceMappingURL=x86asm.js-3X5g_A4G.chunk.mjs.map
