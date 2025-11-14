const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireElm } from "./elm-Cj6qke0X.chunk.mjs";
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
var elm_js$2;
var hasRequiredElm_js;
function requireElm_js() {
  if (hasRequiredElm_js) return elm_js$2;
  hasRequiredElm_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/elm" instead of "highlight.js/lib/languages/elm.js"'
      );
    }
  }
  emitWarning();
  elm_js$2 = /* @__PURE__ */ requireElm();
  return elm_js$2;
}
var elm_jsExports = /* @__PURE__ */ requireElm_js();
const elm_js = /* @__PURE__ */ getDefaultExportFromCjs(elm_jsExports);
const elm_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: elm_js
}, [elm_jsExports]);
export {
  elm_js$1 as e
};
//# sourceMappingURL=elm.js-Bo-JaZS4.chunk.mjs.map
