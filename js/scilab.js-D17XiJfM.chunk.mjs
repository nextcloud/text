const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireScilab } from "./scilab-CobzudNz.chunk.mjs";
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
var scilab_js$2;
var hasRequiredScilab_js;
function requireScilab_js() {
  if (hasRequiredScilab_js) return scilab_js$2;
  hasRequiredScilab_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/scilab" instead of "highlight.js/lib/languages/scilab.js"'
      );
    }
  }
  emitWarning();
  scilab_js$2 = /* @__PURE__ */ requireScilab();
  return scilab_js$2;
}
var scilab_jsExports = /* @__PURE__ */ requireScilab_js();
const scilab_js = /* @__PURE__ */ getDefaultExportFromCjs(scilab_jsExports);
const scilab_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: scilab_js
}, [scilab_jsExports]);
export {
  scilab_js$1 as s
};
//# sourceMappingURL=scilab.js-D17XiJfM.chunk.mjs.map
