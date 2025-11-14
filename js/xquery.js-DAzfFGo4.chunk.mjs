const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireXquery } from "./xquery-BuRh1moB.chunk.mjs";
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
var xquery_js$2;
var hasRequiredXquery_js;
function requireXquery_js() {
  if (hasRequiredXquery_js) return xquery_js$2;
  hasRequiredXquery_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/xquery" instead of "highlight.js/lib/languages/xquery.js"'
      );
    }
  }
  emitWarning();
  xquery_js$2 = /* @__PURE__ */ requireXquery();
  return xquery_js$2;
}
var xquery_jsExports = /* @__PURE__ */ requireXquery_js();
const xquery_js = /* @__PURE__ */ getDefaultExportFromCjs(xquery_jsExports);
const xquery_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: xquery_js
}, [xquery_jsExports]);
export {
  xquery_js$1 as x
};
//# sourceMappingURL=xquery.js-DAzfFGo4.chunk.mjs.map
