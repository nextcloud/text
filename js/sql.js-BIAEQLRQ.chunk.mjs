const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireSql } from "./sql-zYgb8RZA.chunk.mjs";
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
var sql_js$2;
var hasRequiredSql_js;
function requireSql_js() {
  if (hasRequiredSql_js) return sql_js$2;
  hasRequiredSql_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/sql" instead of "highlight.js/lib/languages/sql.js"'
      );
    }
  }
  emitWarning();
  sql_js$2 = /* @__PURE__ */ requireSql();
  return sql_js$2;
}
var sql_jsExports = /* @__PURE__ */ requireSql_js();
const sql_js = /* @__PURE__ */ getDefaultExportFromCjs(sql_jsExports);
const sql_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: sql_js
}, [sql_jsExports]);
export {
  sql_js$1 as s
};
//# sourceMappingURL=sql.js-BIAEQLRQ.chunk.mjs.map
