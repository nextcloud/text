const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireXl } from "./xl-CbpLDpcp.chunk.mjs";
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
var xl_js$2;
var hasRequiredXl_js;
function requireXl_js() {
  if (hasRequiredXl_js) return xl_js$2;
  hasRequiredXl_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/xl" instead of "highlight.js/lib/languages/xl.js"'
      );
    }
  }
  emitWarning();
  xl_js$2 = /* @__PURE__ */ requireXl();
  return xl_js$2;
}
var xl_jsExports = /* @__PURE__ */ requireXl_js();
const xl_js = /* @__PURE__ */ getDefaultExportFromCjs(xl_jsExports);
const xl_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: xl_js
}, [xl_jsExports]);
export {
  xl_js$1 as x
};
//# sourceMappingURL=xl.js-DR9fs8xq.chunk.mjs.map
