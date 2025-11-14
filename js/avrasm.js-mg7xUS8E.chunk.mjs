const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireAvrasm } from "./avrasm-Bu2SFURy.chunk.mjs";
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
var avrasm_js$2;
var hasRequiredAvrasm_js;
function requireAvrasm_js() {
  if (hasRequiredAvrasm_js) return avrasm_js$2;
  hasRequiredAvrasm_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/avrasm" instead of "highlight.js/lib/languages/avrasm.js"'
      );
    }
  }
  emitWarning();
  avrasm_js$2 = /* @__PURE__ */ requireAvrasm();
  return avrasm_js$2;
}
var avrasm_jsExports = /* @__PURE__ */ requireAvrasm_js();
const avrasm_js = /* @__PURE__ */ getDefaultExportFromCjs(avrasm_jsExports);
const avrasm_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: avrasm_js
}, [avrasm_jsExports]);
export {
  avrasm_js$1 as a
};
//# sourceMappingURL=avrasm.js-mg7xUS8E.chunk.mjs.map
