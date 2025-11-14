const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requirePgsql } from "./pgsql-DgfQOxOy.chunk.mjs";
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
var pgsql_js$2;
var hasRequiredPgsql_js;
function requirePgsql_js() {
  if (hasRequiredPgsql_js) return pgsql_js$2;
  hasRequiredPgsql_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/pgsql" instead of "highlight.js/lib/languages/pgsql.js"'
      );
    }
  }
  emitWarning();
  pgsql_js$2 = /* @__PURE__ */ requirePgsql();
  return pgsql_js$2;
}
var pgsql_jsExports = /* @__PURE__ */ requirePgsql_js();
const pgsql_js = /* @__PURE__ */ getDefaultExportFromCjs(pgsql_jsExports);
const pgsql_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: pgsql_js
}, [pgsql_jsExports]);
export {
  pgsql_js$1 as p
};
//# sourceMappingURL=pgsql.js-CnfdvnBD.chunk.mjs.map
