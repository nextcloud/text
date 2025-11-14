const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireGraphql } from "./graphql-OWho-wvr.chunk.mjs";
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
var graphql_js$2;
var hasRequiredGraphql_js;
function requireGraphql_js() {
  if (hasRequiredGraphql_js) return graphql_js$2;
  hasRequiredGraphql_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/graphql" instead of "highlight.js/lib/languages/graphql.js"'
      );
    }
  }
  emitWarning();
  graphql_js$2 = /* @__PURE__ */ requireGraphql();
  return graphql_js$2;
}
var graphql_jsExports = /* @__PURE__ */ requireGraphql_js();
const graphql_js = /* @__PURE__ */ getDefaultExportFromCjs(graphql_jsExports);
const graphql_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: graphql_js
}, [graphql_jsExports]);
export {
  graphql_js$1 as g
};
//# sourceMappingURL=graphql.js-C9DoL021.chunk.mjs.map
