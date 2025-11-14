const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireN1ql } from "./n1ql-BbsUNpdx.chunk.mjs";
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
var n1ql_js$2;
var hasRequiredN1ql_js;
function requireN1ql_js() {
  if (hasRequiredN1ql_js) return n1ql_js$2;
  hasRequiredN1ql_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/n1ql" instead of "highlight.js/lib/languages/n1ql.js"'
      );
    }
  }
  emitWarning();
  n1ql_js$2 = /* @__PURE__ */ requireN1ql();
  return n1ql_js$2;
}
var n1ql_jsExports = /* @__PURE__ */ requireN1ql_js();
const n1ql_js = /* @__PURE__ */ getDefaultExportFromCjs(n1ql_jsExports);
const n1ql_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: n1ql_js
}, [n1ql_jsExports]);
export {
  n1ql_js$1 as n
};
//# sourceMappingURL=n1ql.js-B5yi1rYg.chunk.mjs.map
