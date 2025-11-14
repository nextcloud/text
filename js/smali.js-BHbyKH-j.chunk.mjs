const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireSmali } from "./smali-uxcDd8Ct.chunk.mjs";
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
var smali_js$2;
var hasRequiredSmali_js;
function requireSmali_js() {
  if (hasRequiredSmali_js) return smali_js$2;
  hasRequiredSmali_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/smali" instead of "highlight.js/lib/languages/smali.js"'
      );
    }
  }
  emitWarning();
  smali_js$2 = /* @__PURE__ */ requireSmali();
  return smali_js$2;
}
var smali_jsExports = /* @__PURE__ */ requireSmali_js();
const smali_js = /* @__PURE__ */ getDefaultExportFromCjs(smali_jsExports);
const smali_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: smali_js
}, [smali_jsExports]);
export {
  smali_js$1 as s
};
//# sourceMappingURL=smali.js-BHbyKH-j.chunk.mjs.map
