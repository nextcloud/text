const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireGams } from "./gams-FBLQURrm.chunk.mjs";
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
var gams_js$2;
var hasRequiredGams_js;
function requireGams_js() {
  if (hasRequiredGams_js) return gams_js$2;
  hasRequiredGams_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/gams" instead of "highlight.js/lib/languages/gams.js"'
      );
    }
  }
  emitWarning();
  gams_js$2 = /* @__PURE__ */ requireGams();
  return gams_js$2;
}
var gams_jsExports = /* @__PURE__ */ requireGams_js();
const gams_js = /* @__PURE__ */ getDefaultExportFromCjs(gams_jsExports);
const gams_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: gams_js
}, [gams_jsExports]);
export {
  gams_js$1 as g
};
//# sourceMappingURL=gams.js-G7WFD23y.chunk.mjs.map
