const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requirePurebasic } from "./purebasic-g7a2EwWk.chunk.mjs";
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
var purebasic_js$2;
var hasRequiredPurebasic_js;
function requirePurebasic_js() {
  if (hasRequiredPurebasic_js) return purebasic_js$2;
  hasRequiredPurebasic_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/purebasic" instead of "highlight.js/lib/languages/purebasic.js"'
      );
    }
  }
  emitWarning();
  purebasic_js$2 = /* @__PURE__ */ requirePurebasic();
  return purebasic_js$2;
}
var purebasic_jsExports = /* @__PURE__ */ requirePurebasic_js();
const purebasic_js = /* @__PURE__ */ getDefaultExportFromCjs(purebasic_jsExports);
const purebasic_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: purebasic_js
}, [purebasic_jsExports]);
export {
  purebasic_js$1 as p
};
//# sourceMappingURL=purebasic.js-CG3sbudP.chunk.mjs.map
