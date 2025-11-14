const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireStep21 } from "./step21-DKsArLlL.chunk.mjs";
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
var step21_js$2;
var hasRequiredStep21_js;
function requireStep21_js() {
  if (hasRequiredStep21_js) return step21_js$2;
  hasRequiredStep21_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/step21" instead of "highlight.js/lib/languages/step21.js"'
      );
    }
  }
  emitWarning();
  step21_js$2 = /* @__PURE__ */ requireStep21();
  return step21_js$2;
}
var step21_jsExports = /* @__PURE__ */ requireStep21_js();
const step21_js = /* @__PURE__ */ getDefaultExportFromCjs(step21_jsExports);
const step21_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: step21_js
}, [step21_jsExports]);
export {
  step21_js$1 as s
};
//# sourceMappingURL=step21.js-C-Wx54Dy.chunk.mjs.map
