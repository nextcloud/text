const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireClean } from "./clean-lDVndeiE.chunk.mjs";
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
var clean_js$2;
var hasRequiredClean_js;
function requireClean_js() {
  if (hasRequiredClean_js) return clean_js$2;
  hasRequiredClean_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/clean" instead of "highlight.js/lib/languages/clean.js"'
      );
    }
  }
  emitWarning();
  clean_js$2 = /* @__PURE__ */ requireClean();
  return clean_js$2;
}
var clean_jsExports = /* @__PURE__ */ requireClean_js();
const clean_js = /* @__PURE__ */ getDefaultExportFromCjs(clean_jsExports);
const clean_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: clean_js
}, [clean_jsExports]);
export {
  clean_js$1 as c
};
//# sourceMappingURL=clean.js-DMkybJJM.chunk.mjs.map
