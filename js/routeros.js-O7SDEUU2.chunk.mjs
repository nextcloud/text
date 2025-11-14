const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireRouteros } from "./routeros-IjAKZtqD.chunk.mjs";
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
var routeros_js$2;
var hasRequiredRouteros_js;
function requireRouteros_js() {
  if (hasRequiredRouteros_js) return routeros_js$2;
  hasRequiredRouteros_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/routeros" instead of "highlight.js/lib/languages/routeros.js"'
      );
    }
  }
  emitWarning();
  routeros_js$2 = /* @__PURE__ */ requireRouteros();
  return routeros_js$2;
}
var routeros_jsExports = /* @__PURE__ */ requireRouteros_js();
const routeros_js = /* @__PURE__ */ getDefaultExportFromCjs(routeros_jsExports);
const routeros_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: routeros_js
}, [routeros_jsExports]);
export {
  routeros_js$1 as r
};
//# sourceMappingURL=routeros.js-O7SDEUU2.chunk.mjs.map
