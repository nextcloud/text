const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireLess } from "./less-Cimgpi85.chunk.mjs";
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
var less_js$2;
var hasRequiredLess_js;
function requireLess_js() {
  if (hasRequiredLess_js) return less_js$2;
  hasRequiredLess_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/less" instead of "highlight.js/lib/languages/less.js"'
      );
    }
  }
  emitWarning();
  less_js$2 = /* @__PURE__ */ requireLess();
  return less_js$2;
}
var less_jsExports = /* @__PURE__ */ requireLess_js();
const less_js = /* @__PURE__ */ getDefaultExportFromCjs(less_jsExports);
const less_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: less_js
}, [less_jsExports]);
export {
  less_js$1 as l
};
//# sourceMappingURL=less.js-BhY0GLbf.chunk.mjs.map
