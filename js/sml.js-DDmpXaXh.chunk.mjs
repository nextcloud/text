const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireSml } from "./sml-D5KYeEQY.chunk.mjs";
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
var sml_js$2;
var hasRequiredSml_js;
function requireSml_js() {
  if (hasRequiredSml_js) return sml_js$2;
  hasRequiredSml_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/sml" instead of "highlight.js/lib/languages/sml.js"'
      );
    }
  }
  emitWarning();
  sml_js$2 = /* @__PURE__ */ requireSml();
  return sml_js$2;
}
var sml_jsExports = /* @__PURE__ */ requireSml_js();
const sml_js = /* @__PURE__ */ getDefaultExportFromCjs(sml_jsExports);
const sml_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: sml_js
}, [sml_jsExports]);
export {
  sml_js$1 as s
};
//# sourceMappingURL=sml.js-DDmpXaXh.chunk.mjs.map
