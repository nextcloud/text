const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireSqf } from "./sqf-i7TJAvyA.chunk.mjs";
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
var sqf_js$2;
var hasRequiredSqf_js;
function requireSqf_js() {
  if (hasRequiredSqf_js) return sqf_js$2;
  hasRequiredSqf_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/sqf" instead of "highlight.js/lib/languages/sqf.js"'
      );
    }
  }
  emitWarning();
  sqf_js$2 = /* @__PURE__ */ requireSqf();
  return sqf_js$2;
}
var sqf_jsExports = /* @__PURE__ */ requireSqf_js();
const sqf_js = /* @__PURE__ */ getDefaultExportFromCjs(sqf_jsExports);
const sqf_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: sqf_js
}, [sqf_jsExports]);
export {
  sqf_js$1 as s
};
//# sourceMappingURL=sqf.js-DYp_MpIg.chunk.mjs.map
