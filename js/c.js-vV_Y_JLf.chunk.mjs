const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireC } from "./c-BSsEMhiu.chunk.mjs";
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
var c_js$2;
var hasRequiredC_js;
function requireC_js() {
  if (hasRequiredC_js) return c_js$2;
  hasRequiredC_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/c" instead of "highlight.js/lib/languages/c.js"'
      );
    }
  }
  emitWarning();
  c_js$2 = /* @__PURE__ */ requireC();
  return c_js$2;
}
var c_jsExports = /* @__PURE__ */ requireC_js();
const c_js = /* @__PURE__ */ getDefaultExportFromCjs(c_jsExports);
const c_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: c_js
}, [c_jsExports]);
export {
  c_js$1 as c
};
//# sourceMappingURL=c.js-vV_Y_JLf.chunk.mjs.map
