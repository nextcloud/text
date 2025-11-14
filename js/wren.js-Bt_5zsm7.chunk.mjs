const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireWren } from "./wren-BhqpPR8W.chunk.mjs";
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
var wren_js$2;
var hasRequiredWren_js;
function requireWren_js() {
  if (hasRequiredWren_js) return wren_js$2;
  hasRequiredWren_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/wren" instead of "highlight.js/lib/languages/wren.js"'
      );
    }
  }
  emitWarning();
  wren_js$2 = /* @__PURE__ */ requireWren();
  return wren_js$2;
}
var wren_jsExports = /* @__PURE__ */ requireWren_js();
const wren_js = /* @__PURE__ */ getDefaultExportFromCjs(wren_jsExports);
const wren_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: wren_js
}, [wren_jsExports]);
export {
  wren_js$1 as w
};
//# sourceMappingURL=wren.js-Bt_5zsm7.chunk.mjs.map
