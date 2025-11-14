const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireGml } from "./gml-ByR4-mFr.chunk.mjs";
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
var gml_js$2;
var hasRequiredGml_js;
function requireGml_js() {
  if (hasRequiredGml_js) return gml_js$2;
  hasRequiredGml_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/gml" instead of "highlight.js/lib/languages/gml.js"'
      );
    }
  }
  emitWarning();
  gml_js$2 = /* @__PURE__ */ requireGml();
  return gml_js$2;
}
var gml_jsExports = /* @__PURE__ */ requireGml_js();
const gml_js = /* @__PURE__ */ getDefaultExportFromCjs(gml_jsExports);
const gml_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: gml_js
}, [gml_jsExports]);
export {
  gml_js$1 as g
};
//# sourceMappingURL=gml.js-CclR2A6V.chunk.mjs.map
