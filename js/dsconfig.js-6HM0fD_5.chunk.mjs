const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireDsconfig } from "./dsconfig-hjjGCKCN.chunk.mjs";
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
var dsconfig_js$2;
var hasRequiredDsconfig_js;
function requireDsconfig_js() {
  if (hasRequiredDsconfig_js) return dsconfig_js$2;
  hasRequiredDsconfig_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/dsconfig" instead of "highlight.js/lib/languages/dsconfig.js"'
      );
    }
  }
  emitWarning();
  dsconfig_js$2 = /* @__PURE__ */ requireDsconfig();
  return dsconfig_js$2;
}
var dsconfig_jsExports = /* @__PURE__ */ requireDsconfig_js();
const dsconfig_js = /* @__PURE__ */ getDefaultExportFromCjs(dsconfig_jsExports);
const dsconfig_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: dsconfig_js
}, [dsconfig_jsExports]);
export {
  dsconfig_js$1 as d
};
//# sourceMappingURL=dsconfig.js-6HM0fD_5.chunk.mjs.map
