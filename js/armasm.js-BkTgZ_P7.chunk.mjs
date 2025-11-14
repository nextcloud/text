const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireArmasm } from "./armasm-DQnM_q1q.chunk.mjs";
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
var armasm_js$2;
var hasRequiredArmasm_js;
function requireArmasm_js() {
  if (hasRequiredArmasm_js) return armasm_js$2;
  hasRequiredArmasm_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/armasm" instead of "highlight.js/lib/languages/armasm.js"'
      );
    }
  }
  emitWarning();
  armasm_js$2 = /* @__PURE__ */ requireArmasm();
  return armasm_js$2;
}
var armasm_jsExports = /* @__PURE__ */ requireArmasm_js();
const armasm_js = /* @__PURE__ */ getDefaultExportFromCjs(armasm_jsExports);
const armasm_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: armasm_js
}, [armasm_jsExports]);
export {
  armasm_js$1 as a
};
//# sourceMappingURL=armasm.js-BkTgZ_P7.chunk.mjs.map
