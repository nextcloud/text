const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireCos } from "./cos-9HCFqECQ.chunk.mjs";
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
var cos_js$2;
var hasRequiredCos_js;
function requireCos_js() {
  if (hasRequiredCos_js) return cos_js$2;
  hasRequiredCos_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/cos" instead of "highlight.js/lib/languages/cos.js"'
      );
    }
  }
  emitWarning();
  cos_js$2 = /* @__PURE__ */ requireCos();
  return cos_js$2;
}
var cos_jsExports = /* @__PURE__ */ requireCos_js();
const cos_js = /* @__PURE__ */ getDefaultExportFromCjs(cos_jsExports);
const cos_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: cos_js
}, [cos_jsExports]);
export {
  cos_js$1 as c
};
//# sourceMappingURL=cos.js-CR8UYWMJ.chunk.mjs.map
