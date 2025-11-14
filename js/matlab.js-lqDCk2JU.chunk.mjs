const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireMatlab } from "./matlab-BQ5vRRxa.chunk.mjs";
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
var matlab_js$2;
var hasRequiredMatlab_js;
function requireMatlab_js() {
  if (hasRequiredMatlab_js) return matlab_js$2;
  hasRequiredMatlab_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/matlab" instead of "highlight.js/lib/languages/matlab.js"'
      );
    }
  }
  emitWarning();
  matlab_js$2 = /* @__PURE__ */ requireMatlab();
  return matlab_js$2;
}
var matlab_jsExports = /* @__PURE__ */ requireMatlab_js();
const matlab_js = /* @__PURE__ */ getDefaultExportFromCjs(matlab_jsExports);
const matlab_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: matlab_js
}, [matlab_jsExports]);
export {
  matlab_js$1 as m
};
//# sourceMappingURL=matlab.js-lqDCk2JU.chunk.mjs.map
