const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireCpp } from "./cpp-DarrKeH0.chunk.mjs";
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
var cpp_js$2;
var hasRequiredCpp_js;
function requireCpp_js() {
  if (hasRequiredCpp_js) return cpp_js$2;
  hasRequiredCpp_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/cpp" instead of "highlight.js/lib/languages/cpp.js"'
      );
    }
  }
  emitWarning();
  cpp_js$2 = /* @__PURE__ */ requireCpp();
  return cpp_js$2;
}
var cpp_jsExports = /* @__PURE__ */ requireCpp_js();
const cpp_js = /* @__PURE__ */ getDefaultExportFromCjs(cpp_jsExports);
const cpp_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: cpp_js
}, [cpp_jsExports]);
export {
  cpp_js$1 as c
};
//# sourceMappingURL=cpp.js-aZ-nV-OV.chunk.mjs.map
