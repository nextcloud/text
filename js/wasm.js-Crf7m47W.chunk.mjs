const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireWasm } from "./wasm-CD2djWF0.chunk.mjs";
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
var wasm_js$2;
var hasRequiredWasm_js;
function requireWasm_js() {
  if (hasRequiredWasm_js) return wasm_js$2;
  hasRequiredWasm_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/wasm" instead of "highlight.js/lib/languages/wasm.js"'
      );
    }
  }
  emitWarning();
  wasm_js$2 = /* @__PURE__ */ requireWasm();
  return wasm_js$2;
}
var wasm_jsExports = /* @__PURE__ */ requireWasm_js();
const wasm_js = /* @__PURE__ */ getDefaultExportFromCjs(wasm_jsExports);
const wasm_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: wasm_js
}, [wasm_jsExports]);
export {
  wasm_js$1 as w
};
//# sourceMappingURL=wasm.js-Crf7m47W.chunk.mjs.map
