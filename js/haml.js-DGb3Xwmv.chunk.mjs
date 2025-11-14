const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireHaml } from "./haml-C4FJMwrR.chunk.mjs";
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
var haml_js$2;
var hasRequiredHaml_js;
function requireHaml_js() {
  if (hasRequiredHaml_js) return haml_js$2;
  hasRequiredHaml_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/haml" instead of "highlight.js/lib/languages/haml.js"'
      );
    }
  }
  emitWarning();
  haml_js$2 = /* @__PURE__ */ requireHaml();
  return haml_js$2;
}
var haml_jsExports = /* @__PURE__ */ requireHaml_js();
const haml_js = /* @__PURE__ */ getDefaultExportFromCjs(haml_jsExports);
const haml_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: haml_js
}, [haml_jsExports]);
export {
  haml_js$1 as h
};
//# sourceMappingURL=haml.js-DGb3Xwmv.chunk.mjs.map
