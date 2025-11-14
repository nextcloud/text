const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireGauss } from "./gauss-CNoFFAaU.chunk.mjs";
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
var gauss_js$2;
var hasRequiredGauss_js;
function requireGauss_js() {
  if (hasRequiredGauss_js) return gauss_js$2;
  hasRequiredGauss_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/gauss" instead of "highlight.js/lib/languages/gauss.js"'
      );
    }
  }
  emitWarning();
  gauss_js$2 = /* @__PURE__ */ requireGauss();
  return gauss_js$2;
}
var gauss_jsExports = /* @__PURE__ */ requireGauss_js();
const gauss_js = /* @__PURE__ */ getDefaultExportFromCjs(gauss_jsExports);
const gauss_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: gauss_js
}, [gauss_jsExports]);
export {
  gauss_js$1 as g
};
//# sourceMappingURL=gauss.js-BPj7K6jL.chunk.mjs.map
