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
var x86asmExports = /* @__PURE__ */ requireX86asm();
const x86asm = /* @__PURE__ */ getDefaultExportFromCjs(x86asmExports);
const x86asm$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: x86asm
}, [x86asmExports]);
export {
  x86asm$1 as x
};
//# sourceMappingURL=x86asm-DnmXAI68.chunk.mjs.map
