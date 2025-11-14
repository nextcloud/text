const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireScss } from "./scss-RkMLOEw4.chunk.mjs";
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
var scss_js$2;
var hasRequiredScss_js;
function requireScss_js() {
  if (hasRequiredScss_js) return scss_js$2;
  hasRequiredScss_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/scss" instead of "highlight.js/lib/languages/scss.js"'
      );
    }
  }
  emitWarning();
  scss_js$2 = /* @__PURE__ */ requireScss();
  return scss_js$2;
}
var scss_jsExports = /* @__PURE__ */ requireScss_js();
const scss_js = /* @__PURE__ */ getDefaultExportFromCjs(scss_jsExports);
const scss_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: scss_js
}, [scss_jsExports]);
export {
  scss_js$1 as s
};
//# sourceMappingURL=scss.js-CuO-scE6.chunk.mjs.map
