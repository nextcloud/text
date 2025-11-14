const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireIsbl } from "./isbl-Dtuwswig.chunk.mjs";
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
var isbl_js$2;
var hasRequiredIsbl_js;
function requireIsbl_js() {
  if (hasRequiredIsbl_js) return isbl_js$2;
  hasRequiredIsbl_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/isbl" instead of "highlight.js/lib/languages/isbl.js"'
      );
    }
  }
  emitWarning();
  isbl_js$2 = /* @__PURE__ */ requireIsbl();
  return isbl_js$2;
}
var isbl_jsExports = /* @__PURE__ */ requireIsbl_js();
const isbl_js = /* @__PURE__ */ getDefaultExportFromCjs(isbl_jsExports);
const isbl_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: isbl_js
}, [isbl_jsExports]);
export {
  isbl_js$1 as i
};
//# sourceMappingURL=isbl.js-DhzmZPxK.chunk.mjs.map
